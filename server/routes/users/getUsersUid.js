const express = require("express");
const axios = require("axios");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const db = require("../../database.js");

// @route   GET /api/users/public
// @desc    Returns all user uids 
// @access  Public
router.get(
    "/",
    async (req, res) => {
        try {
            // Use express-validator to validate request
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }

            //fix later so it dosent return logged in users uid
            const uids = await db.models.user.findAll({
                attributes: ['uid']
            });

            const uid_obj = {
                uid_lst: uids
            }

            res.status(200).json({
                result: "Success",
                uid_obj
            });


        } catch (err) {
            console.error(err);
            res.status(500).json({ errorMessage: "Internal server error" });
        }
    }
);

module.exports = router;