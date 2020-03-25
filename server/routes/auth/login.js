const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const db = require("../../database.js");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
// @route   POST api/users/login
// @desc    Login a User
// @access  Public
router.post(
	"/",
	[
		// Checks if username is not empty
		check("username", "Please enter your username").not().isEmpty(),
		check("password", "Please a valid password").isLength({ min: 6 })
	],
	async (req, res) => {
		try {
			// Use express-validator to validate request
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(422).json({ errors: errors.array() });
			}

			// Query to check if username and password exist in database
			const validUser = await db.models.user.findAll({
				where: {
					username: req.body.username,
				}
			});
			// 200 success response if username equal to password
			if ((validUser.length < 0) || (req.body.username != validUser[0].dataValues.username)){
				res.status(401).json({ error: "Invalid Credentials" });
				return;
			} 
			bcrypt.compare(req.body.password, validUser[0].password, async function(err, result){
				if(result){
					const payload = {
						user: {
						  id: validUser[0].dataValues.uid,
						  username: validUser[0].dataValues.username
						}
					};
		
					//TODO: remove jwtsecret into env file
					jwt.sign(
						payload,
						"secret",
						{ expiresIn: 900 },
						(err, token) => {
						  if (err) {
							  return res.status(500).json({ error: error});
						  } else {
							// REMOVE PASSWORD
							console.log("hi");
							return res.status(200).json({ token: token, uid: validUser[0].dataValues.uid});
						  }
						}
					  );

				}
				else {res.status(401).json({ error: "Invalid Credentials" });}
				
			});

			

		} catch (err) {
			console.error(err);
			res.status(500).json({ errorMessage: "Internal server error" });
			return;
		}
	}
);

module.exports = router;
