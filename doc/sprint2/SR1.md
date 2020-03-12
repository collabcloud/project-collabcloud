# :speech_balloon: Sprint 1 Retrospective :speech_balloon:

The Sprint 1 Retrospective was conducted on February 13.

## Participants in the Meeting:
Jarrod, Furqan, Matt, Hans, Rahul, Daniil, Mike

## Unfinished tasks:
An unfinished task from Sprint 1 was COL-4 (As a User, I want to be greeted with a home page (dashboard) after I successfully authenticate so that I can view any updates)
Two other user stories that we be adding are COL-34 (As a Developer, I want to improve the Register page so that the security features are optimal) and COL-35 (As a Developer, I want to improve the Login page so that it authorizes the user and routes to the homepage). These two user stories are a refinement of COL-3 (As a User, I want to be able to authenticate my GitHub account for log-in so that I can use GitHub-related features) from Sprint 1. We realized that we would need to spend more time refining the Login and Register pages, which should have been their own User Stories in retrospection

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

## New User Stories
The following are some new user stories that we will be completing in Sprint 2. We have also recorded these new user stories in sprint2/pb.md and Jira
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
The following are notes compiled from our Sprint 1 Retrospective Meeting

## What are practices that you might want to continue during Sprint 2?
- Every team member was very responsive through the agreed means of communication. This is good and we should keep it up.
- Git flow was followed well by all members of the team. This is good and we should keep it up.
- Stand-ups are being done as scheduled in our Microsoft Teams channel. This is good and we should keep it up.
- Most user stories were completed, and we stayed within the scope of Sprint 1. We will try to complete all user stories and stay within the scope of Sprint 2.
- Everyone used Jira properly. This is good and we should keep it up.
- Team members maintained open communication with one another, providing help to others when needed

## What are some new practices that you may want to use during Sprint 2?
- Code needs to be tested more rigorously, especially after pull requests
- We need to ensure that the project runs on everyone’s machine before demoing
- We will improve our estimations of user stories for Sprint 2, and will try to make more atomic user stories that do not depend on each other
- We should alert each other when we add any major packages or dependencies to the project

## What harmful practices should we stop using during Sprint 2?
- We need to ensure that only one feature is being worked on per branch. This should be easier moving forwards as most of the project has been set-up now
- We need to create more code documentation
- We should try to distribute work more evenly, so that tasks are completed more evenly throughout the sprint

## Best experience during Sprint 1
- Team members learned a lot about what it was like to work in a large software development team
- Integrating all the features together in the dev branch
- Figuring out how GitHub authentication and the register flow works
- Good learning experience

## Worst experience during Sprint 1
- Work may have been rushed at times
