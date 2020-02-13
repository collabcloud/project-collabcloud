# :runner: Sprint 1 Planning Meeting :runner:

### Sprint Goal
The goal of this sprint is to get a working prototype of CollabCloud. By the end of this sprint, we would like: a landing page, the ability to register and log-in, a connection with the GitHub API, a navigation bar, the ability to create projects, and a connection with our database. 

### Participants 
Matthew Huynh, Furqan Qureshi, Michael Phung, Jarrod Servilla, Rahul Bajaj, Hans Paras, Daniil Oliynyk

### Sprint User Stories
The following are the user stories from our backlog that we would like to complete in Sprint 1
COL-1 As a User, I would like to be able to create and own a Project so that I can begin collaborating with other users
COL-2 As a User, I want to be greeted with a landing page when I visit CollabCloud for the first time so that I can learn more about CollabCloud
COL-3 As a User, I want to be able to authenticate my GitHub account for log-in so that I can use GitHub-related features
COL-4 As a User, I want to be greeted with a home page (dashboard) after I successfully authenticate so that I can view any updates
COL-5 As a User, I want to be able to navigate to other parts of the CollabCloud application so that I can use all features of CollabCloud


### Spikes
Many people on our team will be new to the various types of technologies being used in this project. For example, this project makes use of advanced React techniques that not every has used before. Each person will have their own learning to do for the general tech stack. Some more specialized technologies that will require a spike are:
Learning about the GitHub API, what it’s capabilities are, and how we can integrate with it to authenticate our users
Learning about PostgreSQL, how we could use it to store data, and how we can integrate with it to store our data

### Team Capacity and Task Breakdown
Our team will be working at full capacity, meaning that everyone is projected to be available to work on the sprint. We will likely be making sub-tasks for each of the user stories.

COL-1 As a User, I would like to be able to create and own a Project so that I can begin collaborating with other users
Jarrod will be working on creating the ‘Create Projects’ page in the front-end
Matthew and Michael will be working on handling the project form data in the back-end, inserting it into the database
Furqan will working on connecting the front-end and back-end

COL-2 As a User, I want to be greeted with a landing page when I visit CollabCloud for the first time so that I can learn more about CollabCloud
Daniil will be working on the landing page in the front-end

COL-3 As a User, I want to be able to authenticate my GitHub account for log-in so that I can use GitHub-related features
Hans will be working on connecting our back-end with the GitHub API and authenticating with GitHub. He will also be working closely with Rahul and Michael for registering a user
Michael will be working on creating the register page in the front-end, and creating user schemas in the back-end
Rahul and Matthew will be working on handling the registration logic in the back-end
Daniil will be working on the login page in the front-end

COL-4 As a User, I want to be greeted with a home page (dashboard) after I successfully authenticate so that I can view any updates
Furqan will be setting up Redux for the front-end here

COL-5 As a User, I want to be able to navigate to other parts of the CollabCloud application so that I can use all features of CollabCloud
Jarrod will be working on the navbar in the front-end
