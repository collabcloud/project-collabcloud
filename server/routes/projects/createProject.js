const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const uuidv5 = require("uuid/v5");
const db = require("../../database.js");
const moment = require("moment");
require("dotenv").config({ path: "./config/.env" });

// Helper functions
const databaseHelpers = require("../../utils/databaseHelpers");
const notificationHelpers = require("../../utils/notifications/projectNotifications");

const tech_suggestions_dict = require("../../utils/techSuggestions");

// Ensures all pid are unique from userid
const PROJECT_IDS_NAMESPACE = process.env.PROJECT_IDS_NAMESPACE;

// @route   POST api/projects/create
// @desc    Allows a user to create a new project
// @access  Public
router.post(
  "/",
  [
    check("projectName", "Project name is required")
      .not()
      .isEmpty(),
    // check("description", "Project description is required").not().isEmpty(),
    check("isProjectPublic", "Project visibility must be required").isIn([
      "false",
      "true"
    ]),
    check("ownerUserID", "The owner of the project is required")
      .not()
      .isEmpty()
    // check("gitRepoID", "Must provide the ID of the Git repository that this project is associated with").not().isEmpty()
  ],
  async (req, res) => {
    try {
      // Use express-validator to validate request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      // TODO: Check if a project using that gitRepoId already exists (Do we want to do this?)

      // Given the technologies used, construct an encoding string that can be inserted into PSQL
      const techDict = tech_suggestions_dict;
      const technologiesArray = req.body.technologiesUsed;
      let techName = technologiesArray.map(tech => tech.name);
      let numTechnologies = Object.keys(techDict).length;
      let techArray = [];
      for (i = 0; i < numTechnologies; i++) {
        techArray[i] = 0;
      }
      if (techName.length > 0) {
        let techIndex;
        for (techIndex of techName) {
          techArray[techDict[techIndex] - 1] = 1;
        }
      }
      const encodedTech = techArray.join("");

      // Map the links to an array
      let linkArray = req.body.techLinks.map(link => link.value);

      // Generate a unique project ID, using the project name and current time as a hash
      let currentTime = new Date().getTime();
      let projectID = uuidv5(
        req.body.projectName + currentTime,
        PROJECT_IDS_NAMESPACE
      );

      let projectObject = db.models.project.findOrCreate({
        where: {
          ownerId: req.body.ownerUserID,
          projectName: req.body.projectName
        },
        defaults: {
          pid: projectID,
          ownerId: req.body.ownerUserID,
          // gitRepoID: req.body.gitRepoID,
          projectName: req.body.projectName,
          projectDescription:
            req.body.description == ""
              ? "no description"
              : req.body.description,
          isPrivate: req.body.visibility == "false" ? true : false,
          img: "https://i.imgur.com/ncWaC3P.png",
          githubStars: req.body.githubStars,
          technologiesUsed: encodedTech,
          githubLink: linkArray[0] ? linkArray[0] : "",
          websiteLink: linkArray[1] ? linkArray[1] : "",
          devpostLink: linkArray[2] ? linkArray[2] : "",
          linkedinLink: linkArray[3] ? linkArray[3] : ""
        }
      });

      // Get username associated with userid
      const username = await databaseHelpers.getUsername(req.body.ownerUserID);
      if (!username) {
        return res
          .status(404)
          .json({ errorMessage: "The provided ownerUserId does not exist" });
      }

      // Make the user join the project
      const success = await databaseHelpers.addUserToProject(
        req.body.ownerUserID,
        username,
        projectID,
        "owner"
      );

      if (!success) {
        // Some error with Sequelize
        console.log(err);
        return res.status(500).json({ errorMessage: "Internal server error" });
      }

      // Add a notification for this project
      notificationHelpers.addNotification(
        "project_update",
        projectID,
        req.body.ownerUserID,
        req.body.ownerUserID,
        `${username} created ${req.body.projectName} at ${moment().format(
          "MMMM Do YYYY, h:mm:ss a"
        )}!`
      );

      res.status(200).json({ result: "Success" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ errorMessage: "Internal server error" });
    }
  }
);

module.exports = router;
