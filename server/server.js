const express = require("express");
const bodyParser = require('body-parser');
const app = express();
//const db = require("./database.js");
// const db = db_obj.db;
// const account = db_obj.account;
// const project = db_obj.project;





app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    //This will allow React client to get resources from Node.js server
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use("/api/users/register", require("./routes/auth/register"));
app.use("/api/users/login", require("./routes/auth/login"));
app.use("/api/projects/create", require("./routes/projects/createProject"));



const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


module.exports = db;