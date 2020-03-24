const express = require("express");
const router = express.Router();
const { check, validationResult, body} = require("express-validator");
const db = require("../../database.js");
const { Op } = require("sequelize");

var user_sockets = {};
var sockets_users = {};
function messageSendHandler(data){
    var data = JSON.parse(data)
    if(data.to == "" || data.from == "" || data.message == ''){
        return;
    }
    db.models.messages.create({
        sender: data.from,
        receiver: data.to,
        message: data.message
    });
    db.models.chats.update({firstUser: data.from, secondUser: data.to},{
        where:{
            firstUser: data.from, 
            secondUser: data.to
        }
    });
    var to = user_sockets[data.to]
    if(to){
        var ret = {};
        ret.type = "other";
        ret.name = data.from;
        ret.msg = data.message;
        to.emit("messagesend", JSON.stringify(ret));
        // db.models.chats.update({firstUser: data.to, secondUser: data.from, seen: true},{
        //     where:{
        //         firstUser: data.to, 
        //         secondUser: data.from
        //     }
        // });
    }
    db.models.chats.update({firstUser: data.to, secondUser: data.from, seen:false},{
        where:{
            firstUser: data.to, 
            secondUser: data.from
        }
    });
    



}
function messageHandler(socket){
    return function(data){
        if(!data) return;
        user_sockets[data] = socket;
        sockets_users[socket] = data;
    };
}
function disconnectHandler(socket){
    return function(){
        var user = sockets_users[socket];
        delete sockets_users[socket];
        delete user_sockets[user];
    };
}
function messageReplyHandler(data){
    var data = JSON.parse(data);
    db.models.chats.update({firstUser: data.from, secondUser: data.to, seen:true},{
        where:{
            firstUser: data.from, 
            secondUser: data.to
        }
    })
}
function connectHandler(socket){
    socket.emit("message", "Welcome user!");
    socket.on("reply", messageHandler(socket));
    socket.on("messagesend", messageSendHandler);
    socket.on("messagereply", messageReplyHandler);
    socket.on("disconnect", disconnectHandler(socket));


}
async function getMessages(req, res){
    if(!req.query.username || !req.query.myuser){
        return res.status("401").json("");
    }
    try{
        var chats = await db.models.messages.findAll({
            attributes: ['sender', 'receiver', 'message', 'createdAt'],
            where: {
                [Op.or]: [
                    {
                        sender: req.query.username,
                        receiver: req.query.myuser 
                    },
                    {
                        sender: req.query.myuser,
                        receiver: req.query.username
                    }
                    
                ]
            },
            limit: 50,
            order:  [['createdAt', 'ASC']]
        }).map((value) => {
            var dict = value.dataValues
            var date = new Date(value.createdAt);
            var ret = {}
            if(dict.sender == req.query.username){
                ret.type = "other";  
            }
            else{
                ret.type = "user";
                
            }
            ret.name = dict.sender;
            ret.msg = dict.message;
            ret.time = date;
            return ret;

        });
        await db.models.chats.update({firstUser: req.query.myuser, secondUser: req.query.username, seen: true},{
            where:{
                firstUser: req.query.myuser, 
                secondUser: req.query.username
            }
        });
        res.status(200).json(chats);
    }catch(err){
        console.log(err);
        res.status(500).send("Error");
    }
}
module.exports = function(io) {

    io.on('connect', connectHandler);

    router.get("/messages", getMessages);
    router.get("/chats", async (req,res) =>{
        if(!req.query.username){
            return res.status("401").json("");
        }
        try{
            var chats = await db.models.chats.findAll({
                attributes: ['firstUser', 'secondUser', 'seen'],
                where: {
                    firstUser: req.query.username, 
                },
                order:  [['updatedAt', 'DESC']]
            }).map((value) => {
                var dict = value.dataValues;
                var ret = {seen: dict.seen};
                if(dict.firstUser == req.query.username){
                    ret.name = dict.secondUser
                }
                else{
                    ret.name = dict.firstUser;
                }
                return ret;
    
            });
            res.status(200).json(chats);
        }catch(err){
            console.log(err);
            res.status(500).send("Error");
        }
    });
    router.post(
        "/add",
        async (req, res) => {
            try{
                var user = await db.models.user.findAll({
                    where: {
                        username: req.body.username
                    }
                });
                if(user.length < 1){
                    return res.status(401).json({err: "This other user does not exist"});
                }
                if(user[0].username === req.body.myuser){
                    return res.status(401).json({err: "This is your username"})
                }
                
                user = await db.models.chats.findAll({
                    where: {
                        
                        firstUser: req.body.myuser, 
                        secondUser: req.body.username
                        
                    }
                });
                if(user.length > 0){
                    return res.status(401).json({err: "You already have a chat with this user"});
                }
                db.models.chats.create({
                    firstUser: req.body.myuser,
                    secondUser: req.body.username,
                    seen: false

                });
                db.models.chats.create({
                    firstUser: req.body.username,
                    secondUser: req.body.myuser,
                    seen: false

                });
                res.status(200).json("");
            }catch(err){
                console.log(err);
                res.status(500).send("Error");
            }
        }
    );

    router.get("/messages", async function(req, res){});

    return router;
}
