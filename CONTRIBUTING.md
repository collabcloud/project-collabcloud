# Contributing Guide

- This document shows you how to get started with contributing to CollabCloud:
  - [Getting Started](#getting_started)
  - [Coding Styles](#coding_styles)
  - [Git Flow](#git_flow)
  - [Commits](#commits)
  - [Pull Requests](#pull_requests)
  - [Example workflow](#example_workflow)

## Getting Started <a name = "getting_started"></a>
- Be sure to go over the [README](./README.md)
- The wiki pages (to be added soon) contain detailed information about this project's architecture and how the various files in this project are structured
- If you are not a member of the CollabCloud organization on GitHub, you may request to join by contacting one of the developers
- We use [GitHub Issues](https://github.com/collabcloud/project-collabcloud/issues) to track work that needs to be done (similar to user stories), and [GitHub Projects](https://github.com/collabcloud/project-collabcloud/projects) to track the progress of these issues (similar to a Kanban board) 
  - If there is something you want to work on, feel free to create the issue [here](https://github.com/collabcloud/project-collabcloud/issues/new/choose)!

## Coding Styles <a name = "coding_styles"></a>
The following coding styles must be followed:
  - Ensure that you add comments when appropriate for the code you write
  - All JavaScript syntax should follow [ES6](https://www.w3schools.com/js/js_es6.asp):
    - Use `let` instead of `var`
    - Use `const` when appropriate
    - Use arrow functions when appropriate

## Git Flow <a name = "git_flow"></a>
- We use `master` branch, a `dev` branch, and various `feature` branches
  - Both `master` and `dev` branch should contain working, presentable code
  - The `master` branch contains live code that is deployed
  - Branch off of `dev` when working on new issues
  - Use one `feature` branch per issue
- When you create a feature branch, ensure that what you are working on is being tracked as an issue and is in a project!
  - Be sure to give it a descriptive name and prefix it with the issue number in the following manner:
     - `COL-1NNN-InsertDescriptiveName`, where NNN is the issue number 

## Commits <a name = "commits"></a>
- Please include a [descriptive commit message](https://chris.beams.io/posts/git-commit/)
- Feel free to use [emojis](https://gist.github.com/rxaviers/7360908)
- Commit messages must be prepended by `COL-1NNN`, where NNN is the issue number
  - Example:
    ````
    $ git commit -m 'COL-1NNN :pencil: Create front-end components for displaying project comments'
    ````
- Push to the branch

## Pull Requests <a name = "pull_requests"></a>
- When you are making a pull request, you are requesting that your `feature` branch is merged back to the `dev` branch
- Pull requests must be reviewed and approved by two other members of the project before they can be accepted
- Use this checklist to ensure you are making a good pull request:
  - [ ] My code works!
  - [ ] My code doesn't (to my knowledge) break any other pre-existing code
  - [ ] I have resolved merge conflicts
  - [ ] I have documented my code appropriately
  - [ ] My code follows the appropriate coding styles for this project


## Example Workflow <a name = "example_workflow"></a>
- Ensure that you are on the latest version of the `dev` branch
  ````
  $ git checkout dev
  $ git pull
  ````
- Create a new feature branch
  ````
  $ git checkout -b COL-1054-AddProjectComments
  $ git push --set-upstream origin COL-1054-AddProjectComments
  ````
- Add and commit your changes
  ````
  $ git add ProjectComment.js
  $ git commit -m 'COL-1054 :pencil: Create front-end component for displaying project comments'
  ````
- Push changes
  ````
  $ git push
  ````
- Once you are satisfied with your changes, make a pull request
  - See guidelines [here](#pull_requests)
  
Thank you for contributing to CollabCloud!
