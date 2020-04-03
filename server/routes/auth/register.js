require("dotenv").config({ path: "../config/.env" });
const express = require("express");
const axios = require("axios");
const router = express.Router();
const { check, validationResult, body } = require("express-validator");
const db = require("../../database.js");

// Helper functions
const techSuggestionsDict = require("../../utils/techSuggestions");

const bcrypt = require("bcrypt");
const saltRounds = 10;
// @route   POST api/users/register
// @desc    Register User
// @access  Public
router.post(
  "/",
  /*
		The following list below contains all the validations for register input
	*/
  [
    check("username", "Username is required")
      .not()
      .isEmpty(),
    check(
      "password",
      "Password must contain minimum eight characters"
    ).isLength({ min: 8 }),
    check("email", "Email should not be empty")
      .not()
      .isEmpty(),
    check("code", "Password must contain minimum eight characters")
      .not()
      .isEmpty(),
    body("confirmpassword").custom((value, { req }) => {
      if (value != req.body.password) {
        throw new Error("Password confirm must match");
      }
      return true;
    })
  ],
  /*
		The following async function below handles the full request.
	*/
  async (req, res) => {
    try {
      // Use express validator to validate request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      
      // Given the technologies used, construct an encoding string that can be inserted into PSQL
      const techDict = techSuggestionsDict;
      const technologiesArray = req.body.technologies;
      let techName = technologiesArray.map(tech => tech.name);
      let numTechnologies = Object.keys(techDict).length;
      let techArray = [];
      for (i = 0; i < numTechnologies; i++) {
        techArray[i] = 0;
      }
      
      // Encodes the array
      if (techName.length > 0) {
        let techIndex;
        for (techIndex of techName) {
          techArray[techDict[techIndex] - 1] = 1;
        }
      }
      const encodedTech = techArray.join("");

      // This is the GitHub auth code
      const code = req.body.code;
      const clientID = process.env.CLIENT_ID;
      const clientSecret = process.env.CLIENT_SECRET;
      // Get access token from GitHub
      let response = await axios({
        method: "post",
        url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${code}`,
        headers: {
          accept: "application/json"
        }
      });
      let accessToken = response.data.access_token;
      //TODO: Check if the user related to this access token already exists in the DB.
      // Insert a user into database
      let newResponse = await axios.get(`https://api.github.com/user`, {
        headers: {
          accept: "application/json",
          Authorization: `token ${accessToken}`
        }
      });
      let githubUsername = newResponse.data.login;
      if (githubUsername != req.body.username) {
        return res
          .status("400")
          .json({ result: "Username must match Github Username" });
      }
      let githubId = newResponse.data.id;
      const idQuery = await db.models.user.findAll({
        attributes: [`githubid`],
        where: {
          githubid: JSON.stringify(githubId)
        }
      });
      if (Array.isArray(idQuery) && idQuery.length > 0) {
        res.status(301).json({ result: "Redirect to login!" });
        return;
      }

      bcrypt.hash(req.body.password, saltRounds, async function(err, hash) {
        const UserObject = db.models.user.build({
          username: req.body.username,
          password: hash,
          authtoken: accessToken,
          interestedTech: encodedTech,
          githubid: githubId,
          avatar: "https://avatars2.githubusercontent.com/u/45340119?s=400&v=4"
        });
        await UserObject.save();
        res.status(200).json({ result: "Success" });
      });

      return;
    } catch (err) {
      console.log(err);
      res.status(500).json({ errorMessage: "Internal server error" });
    }
  }
);

module.exports = router;
