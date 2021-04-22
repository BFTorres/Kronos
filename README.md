
# KRONOS

by Bernardo & Silvi

________________________________________________________________________________



________________________________________________________________________________
## Description

________________________________________________________________________________
## User Stories
________________________________________________________________________________
404 - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
500 - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
homepage - As a user I want to be able to access the homepage so that I see what the app is about and login and signup
sign up - As a user I want to sign up on the webpage so that I can see all the tasks that I must accomplish
login - As a user I want to be able to log in on the webpage so that I can get back to my account
logout - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
user task list - As a user I want to see all the tasks available so that I can work it out
manager task list - As a manager I want to see all the tasks pending so that I can plan it
task create - As a manager I want to create a task so that I can assign it to an employee 
task detail - As a user I want to see the task description 
task edit - As a user I want to be able to edit the status of the task 

________________________________________________________________________________
## Backlog
List of other features outside of the MVPs scope
________________________________________________________________________________
## ROUTES:
________________________________________________________________________________


!!!!!!!!!!!!!!!!!!!!!!!
GET /

renders the homepage
GET /auth/signup

redirects to / if user logged in
renders the signup form (with flash msg)
POST /auth/signup

redirects to / if user logged in
body:
username
email
password
GET /auth/login

redirects to / if user logged in
renders the login form (with flash msg)
POST /auth/login

redirects to / if user logged in
body:
username
password
POST /auth/logout

body: (empty)
GET /events

renders the event list + the create form
POST /events/create

redirects to / if user is anonymous
body:
name
date
location
description
GET /events/:id

renders the event detail page
includes the list of attendees
attend button if user not attending yet
POST /events/:id/attend

redirects to / if user is anonymous
body: (empty - the user is already stored in the session)
________________________________________________________________________________
## Models
________________________________________________________________________________

User model

username: String
password: String
Event model

owner: ObjectId<User>
name: String
description: String
date: Date
location: String
attendees: [ObjectId<User>]
________________________________________________________________________________
## Links
________________________________________________________________________________

Trello



Link url



Slides


Link Slides.com