const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const db = require("../../database.js");

// @route    GET api/auth
// @desc     Test Authentication
// @access   Public
router.get("/", auth, (req, res) => {
    db.models.user.findAll({
        where: {
            username: req.user.id
        }
    }).then(data => {
        return res.json(data)
    })
});

module.exports = router;