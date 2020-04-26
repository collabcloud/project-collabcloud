# Contributing Guide

- This document shows you how to get started with contributing to CollabCloud

## Getting Started
- The wiki pages (to be added soon) contain detailed information about this project's architecture and how the various files in this project are structured
- If you are not a member of the CollabCloud organization on GitHub, you may request to join by contacting one of the developers

## General <a name = "general"></a>
- We use [GitHub Issues](https://github.com/collabcloud/project-collabcloud/issues) to track work that needs to be done (similar to user stories), and [GitHub Projects](https://github.com/collabcloud/project-collabcloud/projects) to track the progress of these issues (similar to a Kanban board) 
  - If there is something you want to work on, feel free to create the issue [here](https://github.com/collabcloud/project-collabcloud/issues/new/choose)!
- We are using a form of Git flow that involves a `master` branch, a `dev` branch, and a `feature` branch
  - Use one `feature` branch per issue
- Please ensure that your changes are made in accordance with the [Coding Guidelines](./CODING_GUIDELINES.md)

## Submitting changes

- Ensure that what you are working on is being tracked as an issue and is in a project! See the [above](#general) section
- Ensure that you are on the latest version of the `dev` branch
  - Example:
    ````
    $ git checkout dev
    $ git pull
    ````
- Check out a new branch based and name it to what you intend to do. Prefix it with the issue number in the following manner:
  - `COL-1NNN-InsertDescriptiveName`, where NNN is the issue number 
  - Example:
    ````
    $ git checkout -b COL-1054-AddProjectComments
    ````
  - This is a `feature` branch
- Add and commit your changes
  - Please provide a git message that explains what you've done
  - Git commit messages must be prepended by `COL-1NNN`
  - Example:
    ````
    $ git commit -m 'COL-1NNN :pencil: Create front-end components for displaying project comments'
    ````
- Push to the branch
  - Example:
    ````
    $ git push origin BRANCH_NAME
    ````
- Once you are satisfied with your changes, make a pull request
  - See guidelines here (to be added soon)
  
Thank you for contributing to CollabCloud!
