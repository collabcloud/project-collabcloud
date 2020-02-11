const { Sequelize, DataTypes, Model } = require('sequelize');
const uuidv1 = require('uuid/v1');
const db = new Sequelize('collabcloud', 'mikey', '', {
    host: 'localhost',
    dialect: 'postgres'
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
        type: DataTypes.INTEGER,
        allowNull: false
    },
    projectname: {
        type: DataTypes.STRING(20)
    },
    uid: {
        type: DataTypes.UUID,
        references: {
            model: 'user',
            key: 'uid'
        }
    }
}, {

});

db.sync({force: false})
    .then(message => {
        console.log('db synced');

       db.models.user.create({username: "haha i still", password: "CLAP"});

    })
    .catch(function(err) {
        throw err;
    });




module.exports = db;
