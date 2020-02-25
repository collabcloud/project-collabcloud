 # Product Backlog as of the end of Sprint 1
- The product backlog here reflects the state of the project as of the end of Sprint 1
- The user story COL-4 has been brought forwards from Sprint 1, and will be completed in Sprint 2
- We have added four new user stories (COL-34, COL-35, COL-36, COL-37) into our product backlog, that we intend to bring into Sprint 2
- The numerical series that our team will use to estimate user stories is the modified sequence of Fibonacci numbers that was shown in class: 0, 1, 2, 3, 5, 8, 13.
- Priority ranges from: Highest, High, Medium, Low, Lowest

---

<div>
<p><b> COL-4 User Story: </b>As a User, I want to be greeted with a home page after I successfully authenticate so that I can view any updates</p>

<p><b> Priority: </b>Highest</p>

<p><b> Story Points: </b>8</p>

<p><b> Description, Persona, Criteria of Satisfaction: </b>
<br>
After users successfully authenticate, they should be brought to a home page. At the very least, this home page should show the projects that the user is a part of, and their repositories. As more features are added, this home page could show things such as Trending Projects, Messages, and Recommended Hackathons.

This US affects all Personas, as all Personas will see their home page after they authenticate.

Criteria of Satisfaction:
- There should be a Home page view on the front-end
- The home page layout should be easy for the user to navigate
- The back-end should be capable of serving all data that is required to be displayed on the front-end
- Pull requests must be reviewed by at least two other developers
- Code should be documented
- Code should be tested with manual testing at the very least

</p>

</div>

---

<div>
<p><b> COL-34 User Story: </b>As a Developer, I want to improve the Register page so that the security features are optimal</p>

<p><b> Priority: </b>High</p>

<p><b> Story Points: </b>8</p>

<p><b> Description, Persona, Criteria of Satisfaction: </b>
<br>
After users successfully authenticate with GitHub, they should be brought to a CollabCloud register page where they can register for a CollabCloud account. This registration form should take in all required information.

This US affects all Personas, as all Personas will need to see the Registration page before they can start using the application. 

Criteria of Satisfaction:
- The registration form should include all required fields
- The registration form should bring the user to the login or home page (to be decided) once they successfully register
- Passwords and other sensitive data should be hashed before they are stored into the database
- Pull requests must be reviewed by at least two other developers
- Code should be documented
- Code should be tested with manual testing at the very least

</p>

</div>

---

<div>
<p><b> COL-35 User Story: </b>As a Developer, I want to improve the Login page so that it authorizes the user and routes to the homepage</p>

<p><b> Priority: </b>High</p>

<p><b> Story Points: </b>8</p>

<p><b> Description, Persona, Criteria of Satisfaction: </b>
<br>
Users who already have an account should be able to log-in to CollabCloud. Logging in will consist of password authentication. After logging in, users will be redirected to the dashboard page.

This US affects all Personas, as all Personas will need to login before they can start using the application. 

Criteria of Satisfaction:
- The login form should include all required fields
- The login form should bring the user to the home page (dashboard) once they successfully login
- Upon login failure, the user should be alerted why
- Passwords and other sensitive data should be hashed
- Pull requests must be reviewed by at least two other developers
- Code should be documented
- Code should be tested with manual testing at the very least

</p>

</div>

---

<div>
<p><b> COL-36 User Story: </b>As a User, I want to be able to add more information about my Project so that I can view more info about my project</p>

<p><b> Priority: </b>High</p>

<p><b> Story Points: </b>5</p>

<p><b> Description, Persona, Criteria of Satisfaction: </b>
<br>
When users create a project, they should be able to customize their project further. They should be able to configure the project however they want. 

This US affects all Personas, as all Personas may be interested in creating a project at one point. It may be of more interest to Taylor Wei or Sukhwinder Singh, two of our personas that have much more experience and are more fitted to create and lead a project.

Criteria of Satisfaction:
- The projects page should have all required fields
- Upon creating a project, all data should be stored into the database
- Sensitive data should be hashed
- The list of technologies being used will need to be encoded in a way that allows for efficient future retrieval
- Pull requests must be reviewed by at least two other developers
- Code should be documented
- Code should be tested with manual testing at the very least

</p>

</div>

---

<div>
<p><b> COL-37 User Story: </b>As a Developer, I want to ensure that all features integrated in preparation for the demo so that we are prepared</p>

<p><b> Priority: </b>Medium</p>

<p><b> Story Points: </b>5</p>

<p><b> Description, Persona, Criteria of Satisfaction: </b>
<br>
This user story is used internally as a way for our group to track our progress with integrating all user stories together. This user story is meant for us to prepare for our sprint demo, and is an opportunity for us to perform integration testing to ensure that all newly-implemented code works with one another.

In terms of Personas, this user story does not affect any of our users. It is used internally by our group to track integration of user stories.

Criteria of Satisfaction:
- The project code should run without bugs on all team member’s devices
- All user stories completed in this sprint should be integrated into the dev branch
- Pull requests must be reviewed by at least two other developers
- Code should be documented
- Code should be tested with manual testing at the very least

</p>

</div>

---

<div>
<p><b> COL-6 User Story: </b>As a User, I want to be able to create my own public profile so I can keep track of my own information</p>

<p><b> Priority: </b>Highest</p>

<p><b> Story Points: </b>8</p>

<p><b> Description, Persona, Criteria of Satisfaction: </b>
<br>

A User’s public profile would contain information such as their contact information, their interests, their languages, a link to their projects, etc.

This US affects all Personas, as all Personas may be interested in seeing their own public profile.

Criteria of Satisfaction: 
- This may be implemented in the form of a Profile page
- This page should display all relevant information to a user, such as their contact information, their projects, etc.
- The front-end should give users an option to modify information on their profile page
- The back-end should be able to serve any data related to a user to the front-end
- In the back-end, user data should be stored into the database
- Pull requests must be reviewed by at least two other developers
- Code should be documented
- Code should be tested with manual testing at the very least
</p>
</div>

---

<div>
<p><b> COL-7 User Story: </b>As a User, I want to be able to load my existing repositories from GitHub so that I can view information related to my repository</p>

<p><b> Priority: </b>High</p>

<p><b> Story Points: </b>8</p>

<p><b> Description, Persona, Criteria of Satisfaction: </b>
<br>
An authenticated user should be able to view their own GitHub repositories, or any repositories that they are a contributor for.

This US affects all Personas, as all Personas may be interested in seeing their own repositories. 

Criteria of Satisfaction:
- The User should be able to see all of their GitHub repositories
- This information may be displayed on a users Profile page
- The back-end should be capable of serving all data required to the front-end
- The back-end should be able to pull repository data through the GitHub API
- Pull requests must be reviewed by at least two other developers
- Code should be documented
- Code should be tested with manual testing at the very least


</p>

</div>

---

<div>
<p><b> COL-8 User Story: </b>As a User, I would like to be able to view all public projects on CollabCloud so that I can learn more about other projects</p>

<p><b> Priority: </b>High</p>

<p><b> Story Points: </b>5</p>

<p><b> Description, Persona, Criteria of Satisfaction: </b>
<br>
As an authenticated user, I should be able to see a list of all public projects.

This US affects all Personas, as all Personas may be interested in seeing all public projects.

Criteria of Satisfaction: 
- This could be implemented in the Projects view
- The front-end should be capable of displaying a list of all public projects
- The backend should be capable of serving all projects data from the database for projects that are public
- Pull requests must be reviewed by at least two other developers
- Code should be documented
- Code should be tested with manual testing at the very least
</p>
</div>

---

<div>
<p><b> COL-9 User Story: </b>As a User, I would like to be able to follow other Projects and receive notifications so that I can stay up to date with these projects</p>

<p><b> Priority: </b>High</p>

<p><b> Story Points: </b>5</p>

<p><b> Description, Persona, Criteria of Satisfaction: </b>
<br>
As an authenticated user, I want to be able to see what projects that I am following. Any notifications for that project could include any updates (such as commits). These notifications could be displayed on the home page. 

This US affects all Personas, as all Personas may be interested in seeing updates about projects they follow.

Criteria of Satisfaction:
- On the front-end, a Project page should show a button that allows a user to click it and follow that page
- On the back-end, the database should be capable of storing all of the projects that a user is following
- Pull requests must be reviewed by at least two other developers
- Code should be documented
- Code should be tested with manual testing at the very least
</p>
</div>

---

<div>
<p><b> COL-10 User Story: </b>As a User, I want to be able to search for a project by a specific query term so that I can find projects that interest me</p>

<p><b> Priority: </b>High</p>

<p><b> Story Points: </b>5</p>

<p><b> Description, Persona, Criteria of Satisfaction: </b>
<br>
Authenticated users should be able to search for other public projects on the CollabCloud platform. When searching, the platform should be able to discern key terms such as a project name.

This US affects all Personas, as all Personas may be interested in searching for other projects

Criteria of Satisfaction:
- On the front-end, there should be a search bar (perhaps on the navbar) that allows a user to input a search query
- There may also be a dedicated Search Page that also shows additional options (such as checkboxes that allow you to search for projects that are Open vs Closed)
- The back-end should be capable of serving projects that meet the search criteria from the navbar
- Pull requests must be reviewed by at least two other developers
- Code should be documented
- Code should be tested with manual testing at the very least
</p>
</div>

---

<div>
<p><b> COL-11 User Story: </b>As a User, I want to be able to view recommended Projects for me (eg. see the most relevant content for me) so that projects can be suggested to me</p>

<p><b> Priority: </b>Medium</p>

<p><b> Story Points: </b>3</p>

<p><b> Description, Persona, Criteria of Satisfaction: </b>
<br>
As an authenticated user, I should be able to visit a page that shows recommended projects. These projects may be recommended to me because of the settings on my public profile.
For example, suppose a User knows Python, and a newly-posted project uses Python. That user would be able to see that the project is recommended

This US affects all Personas, as all Personas may be interested in seeing recommended projects.

Criteria of Satisfaction:
- On the front-end, this may be implemented on the Home page
- Whenever the user loads up the home page, the back-end will need to serve Projects that are recommended for the user
- Pull requests must be reviewed by at least two other developers
- Code should be documented
- Code should be tested with manual testing at the very least
</p>
</div>

---

<div>
<p><b> COL-12 User Story: </b>As a User, I would like to be able to configure settings for my Project so that I can customize my project</p>

<p><b> Priority: </b>Medium</p>

<p><b> Story Points: </b>3</p>

<p><b> Description, Persona, Criteria of Satisfaction: </b>
<br>
As an authenticated user, I should be able to view a settings page for my project. I can configure settings such as visibility (Private vs Public), availability (looking for developers vs not looking for developers), languages used (eg. Fortran, Lisp, Scala, WebAssembly, etc.), etc.

This US affects all Personas, as all Personas may be interested in seeing their own public profile.

Criteria of Satisfaction:
- On the front-end, there should some sort of settings view that is associated with a Project page
- Settings should be saved into the database on the back-end
- Pull requests must be reviewed by at least two other developers
- Code should be documented
- Code should be tested with manual testing at the very least
</p>
</div>

---

<div>
<p><b> COL-13 User Story: </b>As a User, I want to be able to search for other Users on CollabCloud so that I can learn more about other users on the platform</p>

<p><b> Priority: </b>Medium</p>

<p><b> Story Points: </b>5</p>

<p><b> Description, Persona, Criteria of Satisfaction: </b>
<br>
When users visit CollabCloud, they should be prompted with a landing page. This landing page will contain information about the CollabCloud application. It Authenticated users should be able to search for other users on the CollabCloud platform. When searching, the platform should be able to identify a user’s name.

This US affects all Personas, as all Personas may be interested in searching for other users

Criteria of Satisfaction:
- On the front-end, there should be a search bar (perhaps on the navbar) that allows a user to input a search query
- There may also be a dedicated Search Page that also shows additional options 
- The back-end should be capable of serving users that meet the search criteria from the navbar
- Pull requests must be reviewed by at least two other developers
- Code should be documented
- Code should be tested with manual testing at the very least
</p>
</div>

---

<div>
<p><b> COL-14 User Story: </b>As a User, I want to be able to view all users on the CollabCloud platform so that I can learn more about other users on the platform</p>

<p><b> Priority: </b>Medium</p>

<p><b> Story Points: </b>3</p>

<p><b> Description, Persona, Criteria of Satisfaction: </b>
<br>
As an authenticated user, I should be able to see a list of all users.

This US affects all Personas, as all Personas may be interested in learning more about other users.

Criteria of Satisfaction: 
- The front-end should be capable of displaying a list of all users
- The backend should be capable of serving all public user data
- Pull requests must be reviewed by at least two other developers
- Code should be documented
- Code should be tested with manual testing at the very least
</p>
</div>

---

<div>
<p><b> COL-15 User Story: </b>As a User, I want to be able to view a profile of another User so that I can view their information</p>

<p><b> Priority: </b>Medium</p>

<p><b> Story Points: </b>2</p>

<p><b> Description, Persona, Criteria of Satisfaction: </b>
<br>
Authenticated users should be able to view other users’ public profiles on the CollabCloud platform. Users may need to search for other user

This US affects all Personas, as all Personas may be interested in viewing the public profiles of other users on the platform.

Criteria of Satisfaction: 
- On the front-end, users should be able to view the public profile of other users
- The back-end should be capable of serving all required user data to the front-end, from the database
- Pull requests must be reviewed by at least two other developers
- Code should be documented
- Code should be tested with manual testing at the very least
</p>
</div>

---

<div>
<p><b> COL-16 User Story: </b>As a User, I want to be able to post on a message board (or forum) so that I can discuss bugs, recruit others to my project, etc.</p>

<p><b> Priority: </b>Medium</p>

<p><b> Story Points: </b>8</p>

<p><b> Description, Persona, Criteria of Satisfaction: </b>
<br>
This feature allows users to post public messages that all other users can see. This is meant to be a way for the broader community to communicate, compared to the private messaging feature.

This US affects all Personas, as all Personas may be interested in keeping updated with the CollabCloud community through public messages.

Criteria of Satisfaction:
- On the front-end, this may be implemented on a Projects page
- These are public messages that are meant to be visible to anyone
- When visiting the page of a Project, you should be able to see its message board
- The back-end should be capable of serving all required data to the front-end
- Messages should be saved into the database
- Pull requests must be reviewed by at least two other developers
- Code should be documented
- Code should be tested with manual testing at the very least
</p>
</div>

---

<div>
<p><b> COL-17 User Story: </b>As a User, I want to be able to follow other users and maintain a list of other users that I am following so that I can keep track of users that are relevant to me</p>

<p><b> Priority: </b>Medium</p>

<p><b> Story Points: </b>5</p>

<p><b> Description, Persona, Criteria of Satisfaction: </b>
<br>
Authenticated users should be able to follow other users. A user should be able to keep track of all of the users they are following in a list.

This US affects all Personas, as all Personas may be interested in following other users.

Criteria of Satisfaction:
- On the front-end, when I am viewing another user’s Profile page, there should be a button that allows me to click it to follow that user
- On the back-end, the database should be capable of storing all of the users that I am following
- Pull requests must be reviewed by at least two other developers
- Code should be documented
- Code should be tested with manual testing at the very least
</p>

</div>

---

<div>
<p><b> COL-18 User Story: </b>As a User, I want to see nearby & relevant hackathons so that I can stay up-to-date with these events</p>

<p><b> Priority: </b>Low</p>

<p><b> Story Points: </b>3</p>

<p><b> Description, Persona, Criteria of Satisfaction: </b>
<br>
There should be some type of view that lists hackathons that may be of interest to the authenticated user.

This US is most relevant to Jerome McAllister and Sukwinder Singh as they are both university students, and hackathons are typically targeted towards university students.

Criteria of Satisfaction:
- On the front-end, this information could be displayed on the Home page, or a dedicated Hackathons page
- Information such as the hackathon name, location, and date should be shown
- The back-end should be capable of serving any required data to the front-end
- The back-end may keep track of this data in the database
- The back-end will periodically pull data from other websites such as MLH in order to populate hackathon data
- Pull requests must be reviewed by at least two other developers
- Code should be documented
- Code should be tested with manual testing at the very least
- </p>
</div>

---

<div>
<p><b> COL-19 User Story: </b>As a User, I want to see trending projects on CollabCloud so that I can learn more about trending projects</p>

<p><b> Priority: </b>Low</p>

<p><b> Story Points: </b>3</p>

<p><b> Description, Persona, Criteria of Satisfaction: </b>
<br>
This could be displayed on the home page, or when the user is searching for other projects. This feature is meant to bring about a feeling of community and collaboration, as CollabCloud is meant to bring developers together.

This US affects all Personas, as all Personas may be interested in seeing any trending projects in the CollabCloud community!

Criteria of Satisfaction:
- On the front-end, this could be displayed on a user’s Home page
- The back-end should be capable of serving all required data to the front-end
- The back-end should be able to keep track of projects that are trending
- Pull requests must be reviewed by at least two other developers
- Code should be documented
- Code should be tested with manual testing at the very least
</p>

</div>

---

<div>
<p><b> COL-20 User Story: </b>As a User, I want to be able to send and receive messages to other users so that I can communicate with them</p>

<p><b> Priority: </b>Low</p>

<p><b> Story Points: </b>8</p>

<p><b> Description, Persona, Criteria of Satisfaction: </b>
<br>
Authenticated users should be able to send and receive messages to other users. The communication platform behaves more like an email service with inboxes, and is not meant to be an instant-messaging service. Messages are private between users.

This US affects all Personas, as all Personas may be interested in messaging other users.

Criteria of Satisfaction: 
- On the front-end, users should be able to access a messaging interface that allows them to input text and send them to other users
- On the back-end, messages will need to be saved to a database
- The history of a conversation will need to be served to the front-end
- Pull requests must be reviewed by at least two other developers
- Code should be documented
- Code should be tested with manual testing at the very least
</p>
</div>

---

