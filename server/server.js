const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const db = require("./database.js");
require("dotenv").config({ path: "./config/.env" });
// const db = db_obj.db;
// const account = db_obj.account;
// const project = db_obj.project;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  //This will allow React client to get resources from Node.js server
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-auth-token"
  );
  next();
});
const PORT = process.env.SERVER_PORT;
const server = app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

const socketio = require("socket.io");
const io = socketio(server);
app.use("/api/message", require("./routes/chat/chat")(io));

// Authentication routes
app.use("/api/users/register", require("./routes/auth/register"));
app.use("/api/users/github", require("./routes/auth/github"));
app.use("/api/users/login", require("./routes/auth/login"));
app.use("/api/users/auth", require("./routes/auth/auth"));

// User routes
app.use("/api/user/", require("./routes/user/getUser"));
app.use("/api/username/", require("./routes/user/getUserByName"));
app.use("/api/users/avatar", require("./routes/user/avatar"));

// Project routes
app.use("/api/projects/", require("./routes/projects/getPublicProjects"));
app.use("/api/projects/create", require("./routes/projects/createProject"));
app.use("/api/projects/user/", require("./routes/projects/getUserProjects"));
app.use("/api/projects/information", require("./routes/projects/getProject"));
app.use("/api/projects/update", require("./routes/projects/updateProject"));
app.use("/api/projects/delete", require("./routes/projects/deleteProject"));
app.use("/api/projects/join", require("./routes/projects/joinProject"));
app.use("/api/projects/accept", require("./routes/projects/acceptRequest"));
app.use("/api/projects/img", require("./routes/projects/img"));

app.use("/api/projects/", require("./routes/projects/getPublicProjects"));

// GitHub API routes
app.use("/api/github/repos", require("./routes/github/getRepos"));
app.use("/api/users/public", require("./routes/users/getUsers"));
app.use("/api/users/request", require("./routes/users/requests"));

// Search routes
app.use("/api/search", require("./routes/search/search"));

// Follow/unfollow routes
app.use("/api/follow/user", require("./routes/follow/user"));
app.use("/api/unfollow/user", require("./routes/unfollow/user"));

app.use("/api/hackathons", require("./routes/hackathons/getHackathons"));
app.use("/api/hackathons/add", require("./routes/hackathons/addHackathons"));

// Notification routes
app.use(
  "/api/notifications/",
  require("./routes/notifications/user/getUserNotifications")
);
app.use(
  "/api/notifications/project/get",
  require("./routes/notifications/project/getNotification")
);

// Forum routes
app.use("/api/forum/subforum", require("./routes/forum/subforum"));
app.use("/api/forum/thread", require("./routes/forum/thread"));
app.use("/api/forum/post", require("./routes/forum/post"));
app.use("/api/forum/getAllThreads", require("./routes/forum/getAllThreads"));

//ask about this
app.use("/api/users/profile", require("./routes/profile/profile.js"));
