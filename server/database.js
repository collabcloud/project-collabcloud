require('dotenv').config({ path: './config/.env' });
const { Sequelize, DataTypes, Model } = require('sequelize');

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
    logging: (process.env.DB_LOGGING == "TRUE" ? true : false)
});

try {
    db.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

// Keep all fields lower case ssince psql does some weird stuff with camel case
const User = db.define('user', {
    uid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    username: {
        allowNull: false,
        type: DataTypes.STRING(25)
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING(25)
    },
    authtoken: {
        allowNull: false,
        type: DataTypes.STRING(50)
    },
    githubid: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING(50)
    },
    firstname: {
        allowNull: true,
        type: DataTypes.STRING(25)
    },
    lastname: {
        allowNull: true,
        type: DataTypes.STRING(25)
    },
    city: {
        allowNull: true,
        type: DataTypes.STRING(50)
    },
    province: {
        allowNull: true,
        type: DataTypes.STRING(50)
    },
    description: {
        allowNull: true,
        type: DataTypes.STRING(1000)
    }
}, {

});


const project = db.define('project', {
    pid: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
    },
    projectName: {
        type: DataTypes.STRING(25),
        allowNull: false
    },
    // uid: {
    //     type: DataTypes.UUID,
    //     references: {
    //         model: 'users',
    //         key: 'uid'
    //     },
    //     primaryKey: true
    // },
    // gitRepoID: {
    //     type: DataTypes.STRING(50),
    //     allowNull: false
    // },
    projectName: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    projectDescription: {
        type: DataTypes.STRING(2000),
        allowNull: false
    },
    isPrivate: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    githubStars: {
        type: DataTypes.INTEGER
    },
    technologiesUsed: {
        type: DataTypes.STRING(25),
        allowNull: false
    },
    githubLink: {
        type: DataTypes.STRING(50)
    },
    websiteLink: {
        type: DataTypes.STRING(50)
    },
    devpostLink: {
        type: DataTypes.STRING(50)
    },
    linkedinLink: {
        type: DataTypes.STRING(50)
    },
    dateCreated: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW

    }
}, {

});


// Relation used to store Notifications
// notificationType stores all possible types of notifications that can be created in the system
// TODO: We can add more notificationTypes for future notifications
// -- project_update: made whenever any change is made to a project (COL-9 and COL-12) 
// -- collaboration_request: made when a user gets a request to collaborate on a specific project)
const Notification = db.define("notification", {
    nid: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
    },
    notificationType: {
        type: DataTypes.ENUM("project_update", "collaboration_request"),
        allowNull: false,
        primaryKey: true
    },
    notificationMessage: {
        type: DataTypes.STRING(2000),
        allowNull: false
    },
    dateCreated: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    }
});

// Relation that stores a relationship between a Notification and a User
const users_notifications = db.define('users_notifications');
users_notifications.belongsTo(User, {as: "notifee"});
users_notifications.belongsTo(Notification, {as: "notification"});

const user_followers = db.define('user_followers');
user_followers.belongsTo(User, {as: 'follower'});
user_followers.belongsTo(User, {as: 'followee'});



db.sync({ force: false })
    .then(message => {
        console.log('Database synced');

    })
    .catch(function (err) {
        throw err;
    });

module.exports = db;