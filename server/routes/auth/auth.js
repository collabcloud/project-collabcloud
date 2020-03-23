const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const db = require("../../database.js");

// @route    GET api/auth
// @desc     Test Authentication
// @access   Public
router.get("/", auth, async (req, res) => {
    db.models.user.findAll({
        where: {
            username: req.user.username
        }
    }).then(data => {
        return res.json(data)
    }).catch(err => res.status(400).json(`${err}`));
});

module.exports = router;