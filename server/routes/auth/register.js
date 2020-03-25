/*
	These are the packages that I am using
*/
require('dotenv').config({path: '../config/.env'});
const express = require("express");
const axios = require("axios");
const router = express.Router();
const { check, validationResult, body} = require("express-validator");
const db = require("../../database.js");

const bcrypt = require('bcrypt');
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
				return res.status(422).json({ errors: errors.array()});
			}
		
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
			let githubUsername = newResponse.data.login;
			if(githubUsername != req.body.username){
				return res.status("400").json({ result: "Username must match Github Username"})
			}
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
			bcrypt.hash(req.body.password, saltRounds, async function(err, hash){
				const UserObject = db.models.user.build({
					username: req.body.username,
					password: hash,
					authtoken: accessToken,
					githubid: githubId
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

