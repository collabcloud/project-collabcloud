const express = require("express");
const axios = require("axios");
const router = express.Router();
const { check, validationResult } = require("express-validator");
require("../../backend.js")();

// @route   POST api/users/register
// @desc    Register User
// @access  Public
router.post(
  "/",
  [
    check("code")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const code = req.body.code;
      const clientID = "6f0b64a238f52e8c9523";
      const clientSecret = "948ca1fd9ab6ae6a3d43ae1999c0d48cb5c8b9d2";
      let response = await axios({
        method: "post",
        url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${code}`,
        headers: {
          accept: "application/json"
        }
      });
      let accessToken = response.data.access_token;
      const url = "https://api.github.com/user";
      const config = {
        headers: {
          Authorization: `token ${accessToken}`
        }
      };
      let test_api = await axios.get(url, config);

      res.status(200).json({ result: "Success" });
    } catch (err) {
      res.status(500).json({ errorMessage: "Internal server error" });
    }
  }
);

module.exports = router;
