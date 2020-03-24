/*
	These are the packages that I am using
*/
require('dotenv').config({ path: '../config/.env' });
const express = require("express");
const axios = require("axios");
const router = express.Router();
const { check, validationResult, body } = require("express-validator");
const db = require("../../database.js");


// @route   POST api/users/request
// @desc    Request a user
// @access  Public
router.post(
    "/",
	/*
		The following list below contains all the validations for register input
	*/
    [
        check("requestee", "requestee UID is required").not().isEmpty(),
        check("requester", "requester UID is required").not().isEmpty()
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
                return res.status(422).json({ errors: errors.array() });
            }

            //to do: check if both users exist in users (return 404 if any users dont exist)
            const check = await db.models.user_requests.findAll({
                where: {
                    requestee_uid: req.body.requestee,
                    requester_uid: req.body.requester
                }
            });

            //request already exists in db
            if (check.length > 0) {
                return res.status(400).json({ result: "request already exists" });
            }

            console.log(check);

            //console.log(req.body.requestee);
            //console.log(req.body.requester);

            const RequestObject = db.models.user_requests.build({
                requestee_uid: req.body.requestee,
                requester_uid: req.body.requester
            });

            await RequestObject.save();

            res.status(200).json({ result: "Success" });

            return;
        } catch (err) {
            console.log(err);
            res.status(500).json({ errorMessage: "Internal server error" });
        }
    }
);

module.exports = router;