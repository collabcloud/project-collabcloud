<p align="center">
  <a href="" rel="noopener">
 <img width=121px height=66px src="https://user-images.githubusercontent.com/19757152/78193466-9dac3f00-7448-11ea-990d-7b053e1aea46.png" alt="Project logo"></a>
</p>

<h3 align="center">CollabCloud</h3>

<div align="center">

  
  <!-- [![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE) -->
  [![Status](https://img.shields.io/badge/Status-In%20Development-green)]() 
  [![NPM Version](https://img.shields.io/npm/v/npm)]()
  [![Contributors](https://img.shields.io/badge/Contributors-7-lightgrey)]()
  [![Maintainance](https://img.shields.io/maintenance/yes/2020)]()
  [![Hotel](https://img.shields.io/badge/hotel-trivago-red)]()
  

</div>

---

<p align="center"> CollabCloud is a social networking platform for Developers
    <br> 
</p>

## 📝 Table of Contents
- [About](#about)
- [Getting Started](#getting_started)
- [Deployment](#deployment)
- [Usage](#usage)
- [Built Using](#built_using)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)
- [Environment Variables](#environment_variables)

## 🧐 About <a name = "about"></a>
CollabCloud is a social networking platform built on top of Github’s API. It allows users to post Software Development related projects seeking collaborators, join projects, and find projects that would be best suited for their skillset and needs. This project will cater towards students and have extensive social networking features.

## 🏁 Getting Started <a name = "getting_started"></a>
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites
What things you need to install and run the application
- Node.js (runtime environment, Node package manager) [node.js](https://nodejs.org/en/download/)
- PostgreSQL (database server)
  - Linux:
  - MacOS: we suggest [Postgres.app](https://postgresapp.com/)
  - Windows:
- An Imgur [API key](https://apidocs.imgur.com/?version=latest) (used for image hosting)
- A GitHub v3 [API key](https://developer.github.com/v3/) (used to connect with your GitHub repos)
- OPTIONAL: The [uuid command line tool](https://www.npmjs.com/package/uuid) (used to generate UUID namespace for .env file)

### Installing
A step by step series of examples that tell you how to get a development environment running.

1. Check out the latest code on the master branch
2. Ensure that your PSQL database is running
3. Create an environment file in the server directory
    - `cd server && touch .env`
    - See [here](#environment_variables) for more details about what to put in the .env file
4. From the project directory root, install dependencies for both the client and server
    - `cd client && npm install`
    - `cd server && npm install`
5. Run the program!
    - `cd server && npm run dev`

## 🎈 Usage <a name="usage"></a>
- Navigate to localhost:3000 on your favourite browser
- A user must have a GitHub account in order to register with CollabCloud

## 🚀 Deployment <a name = "deployment"></a>
More to come soon...

## ⛏️ Built Using <a name = "built_using"></a>
- [PostgreSQL](https://www.postgresql.org/) - Database
- [Express](https://expressjs.com/) - Server Framework
- [ReactJs](https://reactjs.org/) - Front End Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment
- [GitHub API v3](https://developer.github.com/v3/)
- [Imgur API](https://apidocs.imgur.com/?version=latest)

## ✍️ Authors <a name = "authors"></a>
- [@daniil-oliynyk](https://github.com/daniil-oliynyk)
- [@Furqan17](https://github.com/Furqan17)
- [@imphungky](https://github.com/imphungky)
- [@jcserv](https://github.com/jcserv)
- [@matthuynh](https://github.com/matthuynh)
- [@parashan](https://github.com/parashan)
- [@TheRBajaj](https://github.com/TheRBajaj)

##🌲Environment Variables<a name = "environment_variables"></a>
Your environment file in server/config/.env should be set up like the following below:
```
# DO NOT COMMIT THIS FILE
# This is the environment variables file

# PSQL variables
DB_NAME=collabcloud
DB_USER=postgres
DB_PASS=''
DB_HOST=localhost
DB_PORT=
DB_LOGGING=FALSE
# TRUE

# UUID variables, to generate, use the `uuid` command line program
PROJECT_IDS_NAMESPACE=
FORUM_IDS_NAMESPACE=
PROJECT_NOTIFICATION_IDS_NAMESPACE=

# GitHub API variables
CLIENT_ID=
CLIENT_SECRET=

# Server variables
SERVER_PORT=5000

# Imgur API variables
IMG_CLIENT_ID=
IMG_CLIENT_SECRET=
IMG_ACCESS_TOKEN=
IMG_REFRESH_TOKEN=
```
