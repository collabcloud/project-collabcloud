require("dotenv").config({ path: "./config/.env" });
const { Sequelize, DataTypes, Model } = require("sequelize");

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: process.env.DB_PORT,
    logging: process.env.DB_LOGGING == "TRUE" ? console.log : false,
  }
);

try {
  db.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

// Keep all fields lower case since psql does some weird stuff with camel case
const User = db.define(
  "user",
  {
    uid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING(39),
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING(255),
    },
    authtoken: {
      allowNull: false,
      type: DataTypes.STRING(50),
    },
    // If changing this, also need to change technologiesUsed in Project
    interestedTech: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    githubid: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(50),
    },
    firstname: {
      allowNull: true,
      type: DataTypes.STRING(25),
    },
    lastname: {
      allowNull: true,
      type: DataTypes.STRING(25),
    },
    city: {
      allowNull: true,
      type: DataTypes.STRING(50),
    },
    province: {
      allowNull: true,
      type: DataTypes.STRING(50),
    },
    description: {
      allowNull: true,
      type: DataTypes.STRING(1000),
    },
    avatar: {
      allowNull: false,
      type: DataTypes.STRING(100),
    },
  },
  {}
);

const project = db.define(
  "project",
  {
    pid: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
    },
    projectName: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    ownerId: {
      type: DataTypes.UUID,
      references: {
        model: "users",
        key: "uid",
      },
      primaryKey: true,
    },
    img: {
      allowNull: false,
      type: DataTypes.STRING(100),
    },
    // gitRepoID: {
    //     type: DataTypes.STRING(50),
    //     allowNull: false
    // },
    projectDescription: {
      type: DataTypes.STRING(10000),
      allowNull: false,
    },
    isPrivate: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    githubStars: {
      type: DataTypes.STRING(10),
    },
    // If changing this, need to also change interestedTech in User
    technologiesUsed: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    githubLink: {
      type: DataTypes.STRING(2048),
    },
    websiteLink: {
      type: DataTypes.STRING(2048),
    },
    devpostLink: {
      type: DataTypes.STRING(2048),
    },
    linkedinLink: {
      type: DataTypes.STRING(2048),
    },
  },
  {}
);

const user_followers = db.define("user_followers");
user_followers.belongsTo(User, { as: "follower" });
user_followers.belongsTo(User, { as: "followee" });

// Table to store hackathons for 2020 season. For now hardcoded all hackathons but could be web scraped in the future.
const Hackathons = db.define("hackathons", {
  name: {
    type: DataTypes.STRING(25),
    primaryKey: true,
  },
  date: {
    type: DataTypes.STRING(25),
  },
  location: {
    type: DataTypes.STRING(25),
  },
  link: {
    type: DataTypes.STRING(50),
  },
});

const Subforum = db.define(
  "subforum",
  {
    sid: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
  },
  {}
);

// Relation that stores a Follows relationship between a Project and a User
const user_follows_project = db.define("user_follows_project", {
  isOwner: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING(25),
    allowNull: false,
  },
});
user_follows_project.belongsTo(User, { as: "user" });
user_follows_project.belongsTo(project, { as: "project" });

const chats = db.define("chats", {
  firstUser: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  secondUser: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  seen: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});
const messages = db.define("messages", {
  sender: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  receiver: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  message: {
    type: DataTypes.STRING(20000),
    allowNull: false,
  },
});

const Thread = db.define(
  "thread",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: false,
    },
    tid: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
    },
    topic: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    dateCreated: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
    forum_title: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING(25),
    },
  },
  {}
);

Thread.belongsTo(User, { as: "submitter" });
Thread.belongsTo(Subforum, { as: "subforum" });

const Post = db.define(
  "post",
  {
    pid: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
    },
    content: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    dateCreated: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING(25),
    },
  },
  {}
);

Post.belongsTo(Thread);
Post.belongsTo(Subforum);
Post.belongsTo(User, { as: "submitter" });

// Relation used to store Notifications
// notificationType stores all possible types of notifications that can be created in the system
// TODO: We can add more notificationTypes for future notifications
// -- project_update: made whenever any change is made to a project (COL-9 and COL-12)
// -- collaboration_request: made when a user gets a request to collaborate on a specific project)
const Notification = db.define("notifications", {
  nid: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
  },
  // The resource it is referencing
  rid: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
  },
  notificationType: {
    type: DataTypes.ENUM(
      "project_update",
      "collaboration_request",
      "thread_comment",
      "project_comment",
      "chat_receive",
      "chat_response"
    ),
    allowNull: false,
    primaryKey: true,
  },
  notificationCreator: {
    type: Sequelize.UUID,
    allowNull: false,
  },
  notificationObserver: {
    type: Sequelize.UUID,
    allowNull: false,
  },
  notificationMessage: {
    type: DataTypes.STRING(2000),
    allowNull: false,
  },
  submessage: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  url: {
    type: DataTypes.STRING(2000),
    allowNull: true,
  },
});

// Project requests
const user_requests = db.define("user_requests", {
  requestee_uid: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
  },
  requester_uid: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
  },
  projectName: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
  requesterName: {
    type: DataTypes.STRING(39),
    allowNull: false,
  },
  requesteeName: {
    type: DataTypes.STRING(39),
    allowNull: false,
  },
});

user_requests.belongsTo(User, { as: "owner" });
user_requests.belongsTo(project, { as: "project" });

db.sync({ force: false })
  .then((message) => {
    console.log("Database synced");
  })
  .catch(function (err) {
    throw err;
  });

module.exports = db;
