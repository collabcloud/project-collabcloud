const express = require("express");
const axios = require("axios");
const router = express.Router();
const { check, validationResult } = require("express-validator");
require("../../backend.js")()

// @route   POST api/users/register
// @desc    Register User
// @access  Public
router.post(
	"/",
	[	
		check("name", "Name is required").not().isEmpty(),
		check("email", "Please include a valid email").isEmail(),
		check("password","Please enter a password with 6 or more characters").isLength({ min: 6 })
	],
	async (req, res) => {
		
		try {
			// Use express-validator to validate request
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(422).json({ errors: errors.array() });
			}
			console.log(exists(req.body.name,req.body.email,req.body.password));

			res.status(200).json({ result: "Success" });
		} catch (err) {
            console.error(err);
            res.status(500).json({ errorMessage: "Internal server error" });
        }
	}
);

router.post(
	"/github",
	[
		check("code").not().isEmpty()
	],
	async(req,res) => {
		try{
			console.log(req.body);
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}
			const code = req.body.code;
			const clientID = "08f4f6db13802f8cd769";
			const clientSecret = "7c01fda97c9ee5d3bbab94dbf1b548bab8e6b6be";
			let  response = await axios({
					method: 'post',
					url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${code}`,
					headers:{
						accept: 'application/json'
					}
				});
			let accessToken = response.data.access_token;
			console.log(accessToken);
			let test_api = await axios({
					headers: {
						Authorization: `token ${accessToken}`
					},
					url: 'https://api.github.com/user'
			});

			let test_response = test_api.data;
			
			console.log(test_response);
			res.status(200).json({result: "Success"});
		}catch(err){
			console.error(err);
			res.status(500).json({ errorMessage: "Internal server error" });
		}
	}
);

module.exports = router;
