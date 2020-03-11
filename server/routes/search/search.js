const express = require("express");
const router = express.Router();
const { check, validationResult, body} = require("express-validator");
const db = require("../../database.js");
const { Op } = require("sequelize") ;

router.get(
	"/",
	async (req, res) => {
		try {
            // Use express-validator to validate request
            var term = req.query.term;
            const projects = await db.models.project.findAll({
				where: {
                    isPrivate: false,
                    [Op.or]: [
                        {projectName: {
                            [Op.substring]: term}}, 
                        {projectDescription: {
                            [Op.substring]: term}}
                    ]
				}
            });
            // const users = await db.models.user.findAll({
            //     where: {
            //         [Op.or]: [
            //             {username: {
            //                 [Op.substring]: term}}, 
            //         ]
			// 	}
            // });
			res.status(200).json({
                result: "Success",
                projects: projects,
                // users: users
			});


		} catch (err) {
            console.error(err);
            res.status(500).json({ errorMessage: "Internal server error" });
        }
	}
);

module.exports = router;