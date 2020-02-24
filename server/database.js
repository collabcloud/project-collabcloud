require('dotenv').config({path: './config/.env'});
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
    // projectName: {
    //     type: DataTypes.STRING(50),
    //     allowNull: false
    // },
    // projectDescription: {
    //     type: DataTypes.STRING(2000),
    //     allowNull: false
    // },
    // isPrivate: {
    //     type: DataTypes.BOOLEAN,
    //     allowNull: false
    // },
    // technologiesUsed: {
    //     type: DataTypes.ARRAY(DataTypes.STRING(30))
    // },
    // githubLink: {
    //     type:DataTypes.STRING(50)
    // },
    // websiteLink: {
    //     type:DataTypes.STRING(50)
    // },
    // devpostLink: {
    //     type: DataTypes.STRING(50)
    // },
    // linkedinLink: {
    //     type: DataTypes.STRING(50)
    // },
    dateCreated: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW

    }
}, {

});

db.sync({ force: false })
    .then(message => {
        console.log('db synced');

    })
    .catch(function (err) {
        throw err;
    });

module.exports = db;