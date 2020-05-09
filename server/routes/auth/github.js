require("dotenv").config({ path: "../config/.env" });
const express = require("express");
const axios = require("axios");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

// @route   POST api/users/register
// @desc    Register User
// @access  Public
router.post(
  "/",
  [
    check("code")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const code = req.body.code;
      let response = await axios({
        method: "post",
        url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${code}`,
        headers: {
          accept: "application/json"
        }
      });
      let accessToken = response.data.access_token;
      const url = "https://api.github.com/user";
      const config = {
        headers: {
          Authorization: `token ${accessToken}`
        }
      };
      let test_api = await axios.get(url, config);

      res.status(200).json({ result: "Success" });
    } catch (err) {
      res.status(500).json({ errorMessage: "Internal server error" });
    }
  }
);

module.exports = router;
