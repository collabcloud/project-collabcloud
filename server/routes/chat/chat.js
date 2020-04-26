const express = require("express");
const router = express.Router();
const uuidv5 = require("uuid/v5");
require("dotenv").config({ path: "./config/.env" });

const db = require("../../database.js");
const { Op } = require("sequelize");
const moment = require("moment");
const notificationHelpers = require("../../utils/notifications/projectNotifications");

let user_sockets = {};
let sockets_users = {};
async function messageSendHandler(data) {
  let msg = JSON.parse(data);
  if (msg.to == "" || msg.from == "" || msg.message == "") {
    return;
  }
  db.models.messages.create({
    sender: msg.from,
    receiver: msg.to,
    message: msg.message,
  });
  db.models.chats.update(
    { firstUser: msg.from, secondUser: msg.to },
    {
      where: {
        firstUser: msg.from,
        secondUser: msg.to,
      },
    }
  );
  let to = user_sockets[msg.to];
  if (to) {
    let ret = {};
    ret.type = "other";
    ret.name = msg.from;
    ret.msg = msg.message;
    ret.time = new Date();
    to.emit("messagesend", JSON.stringify(ret));
    // db.models.chats.update({firstUser: data.to, secondUser: data.from, seen: true},{
    //     where:{
    //         firstUser: data.to,
    //         secondUser: data.from
    //     }
    // });
  }
  db.models.chats.update(
    { firstUser: msg.to, secondUser: msg.from, seen: false },
    {
      where: {
        firstUser: msg.to,
        secondUser: msg.from,
      },
    }
  );

  const receiver = await db.models.user.findOne({
    where: {
      username: msg.to,
    },
  });

  const sender = await db.models.user.findOne({
    where: {
      username: msg.from,
    },
  });
  notificationHelpers.addChatNotification(
    "chat_receive",
    sender.uid,
    receiver.uid,
    `${msg.from} sent a message at ${moment().format(
      "MMMM Do YYYY, h:mm:ss a"
    )}!`,
    `${msg.from} said: ${msg.message}`
  );
}
function messageHandler(socket) {
  return function (data) {
    if (!data) return;
    user_sockets[data] = socket;
    sockets_users[socket] = data;
  };
}
function disconnectHandler(socket) {
  return function () {
    let user = sockets_users[socket];
    delete sockets_users[socket];
    delete user_sockets[user];
  };
}
async function messageReplyHandler(data) {
  let msg = JSON.parse(data);
  db.models.chats.update(
    { firstUser: msg.from, secondUser: msg.to, seen: true },
    {
      where: {
        firstUser: msg.from,
        secondUser: msg.to,
      },
    }
  );

  //TODO: remove this workaround
  const receiver = await db.models.user.findOne({
    where: {
      username: msg.to,
    },
  });

  const sender = await db.models.user.findOne({
    where: {
      username: msg.from,
    },
  });

  notificationHelpers.addChatNotification(
    "chat_response",
    sender.uid,
    receiver.uid,
    `${msg.from} responded to your message at ${moment().format(
      "MMMM Do YYYY, h:mm:ss a"
    )}!`,
    `${msg.from} said: ${msg.message}`
  );
}
function connectHandler(socket) {
  socket.emit("message", "Welcome user!");
  socket.on("reply", messageHandler(socket));
  socket.on("messagesend", messageSendHandler);
  socket.on("messagereply", messageReplyHandler);
  socket.on("disconnect", disconnectHandler(socket));
}
async function getMessages(req, res) {
  if (!req.query.username || !req.query.myuser) {
    return res.status("401").json("");
  }
  try {
    let chats = await db.models.messages
      .findAll({
        attributes: ["sender", "receiver", "message", "createdAt"],
        where: {
          [Op.or]: [
            {
              sender: req.query.username,
              receiver: req.query.myuser,
            },
            {
              sender: req.query.myuser,
              receiver: req.query.username,
            },
          ],
        },
        limit: 50,
        order: [["createdAt", "ASC"]],
      })
      .map((value) => {
        let dict = value.dataValues;
        let date = new Date(value.createdAt);
        let ret = {};
        if (dict.sender == req.query.username) {
          ret.type = "other";
        } else {
          ret.type = "user";
        }
        ret.name = dict.sender;
        ret.msg = dict.message;
        ret.time = date;
        return ret;
      });
    await db.models.chats.update(
      {
        firstUser: req.query.myuser,
        secondUser: req.query.username,
        seen: true,
      },
      {
        where: {
          firstUser: req.query.myuser,
          secondUser: req.query.username,
        },
      }
    );
    res.status(200).json(chats);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
}
module.exports = function (io) {
  io.on("connect", connectHandler);

  router.get("/messages", getMessages);
  router.get("/chats", async (req, res) => {
    if (!req.query.username) {
      return res.status("401").json("");
    }
    try {
      let chats = await db.models.chats
        .findAll({
          attributes: ["firstUser", "secondUser", "seen"],
          where: {
            firstUser: req.query.username,
          },
          order: [["updatedAt", "DESC"]],
        })
        .map((value) => {
          let dict = value.dataValues;
          let ret = { seen: dict.seen };
          if (dict.firstUser == req.query.username) {
            ret.name = dict.secondUser;
          } else {
            ret.name = dict.firstUser;
          }
          return ret;
        });
      res.status(200).json(chats);
    } catch (err) {
      console.log(err);
      res.status(500).send("Error");
    }
  });
  router.post("/add", async (req, res) => {
    try {
      let user = await db.models.user.findAll({
        where: {
          username: req.body.username,
        },
      });
      if (user.length < 1) {
        return res.status(401).json({ err: "This other user does not exist" });
      }
      if (user[0].username === req.body.myuser) {
        return res.status(401).json({ err: "This is your username" });
      }

      let chat = await db.models.chats.findAll({
        where: {
          firstUser: req.body.myuser,
          secondUser: req.body.username,
        },
      });
      if (chat.length > 0) {
        return res
          .status(401)
          .json({ err: "You already have a chat with this user" });
      }
      db.models.chats.create({
        firstUser: req.body.myuser,
        secondUser: req.body.username,
        seen: false,
      });
      db.models.chats.create({
        firstUser: req.body.username,
        secondUser: req.body.myuser,
        seen: false,
      });
      res.status(200).json({ avatar: user[0].avatar });
    } catch (err) {
      console.log(err);
      res.status(500).send("Error");
    }
  });

  router.get("/messages", async function (req, res) {});

  return router;
};
