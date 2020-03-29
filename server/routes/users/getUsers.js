const express = require("express");
const axios = require("axios");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const db = require("../../database.js");
const { Op } = require('sequelize');

// @route   GET /api/users/public
// @desc    Returns all users 
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

            // const users = await db.models.user.findAll({
            //     attributes: ['username', 'uid'],
            //     where: {
            //         [Op.not]: [{ username: state.user.uid }]

            //     }
            // });

            const users = await db.models.user.findAll({
                attributes: ['username', 'uid']
            });

            const users_obj = {
                users_lst: users
            }

            res.status(200).json({
                result: "Success",
                users_obj
            });


        } catch (err) {
            console.error(err);
            res.status(500).json({ errorMessage: "Internal server error" });
        }
    }
);

module.exports = router;