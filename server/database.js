const { Sequelize, DataTypes, Model } = require('sequelize');
const db = new Sequelize('collabcloud', 'postgres', '504687', {
    host: 'localhost',
    dialect: 'postgres',
    port: 6000
});

try {
    db.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}


const User = db.define('user', {
    uid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING(15)
    },
    password: {
        type: DataTypes.STRING(15)
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
