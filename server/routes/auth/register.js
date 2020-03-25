/*
	These are the packages that I am using
*/
require('dotenv').config({path: '../config/.env'});
const express = require("express");
const axios = require("axios");
const router = express.Router();
const { check, validationResult, body} = require("express-validator");
const db = require("../../database.js");




// @route   POST api/users/register
// @desc    Register User
// @access  Public
router.post(
	"/",
	/*
		The following list below contains all the validations for register input
	*/
	[
		check("username", "Username is required").not().isEmpty(),
		check("password", "Password must contain minimum eight characters").isLength({ min: 8 }),
		check("email", "Email should not be empty").not().isEmpty(),
		check("code", "Password must contain minimum eight characters").not().isEmpty(),
		body("confirmpassword").custom((value, { req }) =>{
			if(value != req.body.password){
				throw new Error("Password confirm must match")
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
				console.log(errors);
				return res.status(422).json({ errors: errors.array()});
			}
			const techDict = {
				"MongoDB": 1,
				"Express": 2,
				"React": 3,
				"Node.js": 4,
				"Python": 5,
				"JavaScript": 6,
				"Java": 7,
				"C++": 8,
				"C#": 9,
				"HTML/CSS": 10,
				"Swift": 11,
				"SQL": 12,
				"MongoDB": 13,
				"Express": 14,
				"React": 15,
				"Angular": 16,
				"VueJS": 17,
				"Flutter": 18,
				"Kubernetes": 19,
				"Jupyter": 20,
				"Pytorch": 21,
				"Numpy": 22,
				"Passport": 23,
				"Kotlin": 24
			}

			// Given the technologies used, construct an encoding string that can be inserted into PSQL
			const technologiesArray = req.body.technologies;
			let techName = technologiesArray.map(tech => tech.name);
			let techArray = [];
			// If you add more technologies into the techDict dictionary, then change the total value of the array
			for (i = 0; i < 24; i++) {
				techArray[i] = 0;
			}
			if (techName.length > 0) {
				let techIndex;
				for (techIndex of techName) {
					techArray[techDict[techIndex] - 1] = 1;
				}
			}
			const encodedTech = techArray.join('');
		
			// This is the GitHub auth code
			const code = req.body.code;
			const clientID = process.env.CLIENT_ID;
			const clientSecret = process.env.CLIENT_SECRET;
			// Get access token from GitHub
			let response = await axios({
				method: 'post',
				url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${code}`,
				headers: {
					accept: 'application/json'
				}
			});
			let accessToken = response.data.access_token;
			//TODO: Check if the user related to this access token already exists in the DB.
			// Insert a user into database
			let newResponse = await axios.get(`https://api.github.com/user`,{
				headers: { 
					accept:'application/json',
					Authorization: `token ${accessToken}`
				}
				
			});
			let githubId = newResponse.data.id;
			const idQuery = await db.models.user.findAll({
				attributes:[`githubid`],
				where:{
					githubid: JSON.stringify(githubId)
				}
			});
			if(Array.isArray(idQuery) && idQuery.length > 0){
				res.status(301).json({ result: "Redirect to login!" });
				return;
			}
			const UserObject = db.models.user.build({
				username: req.body.username,
				password: req.body.password,
				authtoken: accessToken,
				interestedTech: encodedTech,
				githubid: githubId
			});
			await UserObject.save();
			res.status(200).json({ result: "Success" });
			
			return;
		} catch (err) {
			console.log(err);
			res.status(500).json({ errorMessage: "Internal server error" });
		}
	}
);

module.exports = router;

