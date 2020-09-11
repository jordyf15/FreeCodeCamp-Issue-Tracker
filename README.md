# FreeCodeCamp's Issue Tracker
For the second project of FreeCodeCamp's Quality Assurance Curriculum, we have to make a issue tracker along with its testing.This issue tracker can add,delete, and view projects and also add, delete, update, and view all issues in a project.

## Live Demo on Repl
https://freecodecamp-issue-tracker-1.jordyf15.repl.co

## Technologies Used:
1. HTML
2. CSS
3. Javascript
4. Body-parser version ^1.15.2
5. Chai version ^3.5.0
6. Chai-http version ^3.0.0
7. Cors version ^2.8.1
8. EJS version ^3.1.5
9. Express version ^4.14.0
10. Helmet version ^3.1.0
11. Mocha version ^3.2.0
12. Mongoose version ^5.10.3"mongodb": "^2.2.16",
13. Zombie version ^5.0.5

## User-Stories:
1. Prevent cross site scripting (XSS) attacks.
2. I can POST /api/issues/{projectname} with form data containing required issue_title, issue_text, created_by, and optional assigned_to and status_text.
3. The object saved (and returned) will include all of those fields (blank for optional no input) and also include created_on(date/time), updated_on(date/time), open(boolean, true for open, false for closed), and _id.
4. I can PUT /api/issues/{projectname} with a id and any fields in the object with a value to object said object. Returned will be 'successfully updated' or 'could not update '+id. This should always update updated_on. If no fields are sent return 'no updated field sent'.
5. I can DELETE /api/issues/{projectname} with a id to completely delete an issue. If no _id is sent return 'id error', success: 'deleted '+id, failed: 'could not delete '+id.
6. I can GET /api/issues/{projectname} for an array of all issues on that specific project with all the information for each issue as was returned when posted.
7. I can filter my get request by also passing along any field and value in the query(ie. /api/issues/{project}?open=false). I can pass along as many fields/values as I want.
8. All 11 functional tests are complete and passing.

## Project-Description:
In this project we have to complete the routes/api.js so it can handle requests and also add security features to server.js and then we have to create all of the functional tests in `tests/2_functional-tests.js`.
  

In order to work properly this project's original feature isn't very complete, since it doesn't have the following features:
1. An option to create a project first.  
Since the issues belong to a project then the user must first make a project.
2. Viewing all list of available projects  
If the user want to add an issue to an existing project then he/she must know the list of all available projects.
3. Deleting a project  
A user should also be able to delete a project.
  
So with those incomplete features in mind, i have to create additional routes in the api.js and also the server.js.  
### Server.js
1. In server.js originally there 2 routes:
- `/:project/` which will the issue.ejs where all the existing issues of a project are rendered. In here there are also forms and button that will call an ajax request to api.js in the route folder to add, update, and delete the issues in the project.
- `/` the main route where the form of adding, updating, viewing, and deleting both project and issues are rendered. This route will serve the index.html file
2. Then there is another additional route created by me:
- `/api/projects` which will serve the projects.html file where all the existing projects are rendered. Here there are button for each project that will go to the '/:project/' route to view all the issues of said project.  
3. We also have to use the helmet middle ware to prevent the cross site scripting (XSS) attacks.

### api.js
The api.js is where the routes that will answer the ajax requests is located. There 2 routes but with 3-4 methods.
1. `/api/issues/:project`
This is the route which will do the crud operation for the issues in a project. The project will be chosen depending on the req.param.project. There are 4 methods in this route:
 1. The `post` method: this method will add a new issue to a project by pushing a new issue object to the project's issue array. Than it will save it.
 2. The `get` method: This method will get all of the issue in the project that fulfill the filter requirement. If there are no filter then it will get all issue in the project.
 3. The `delete` method: this method will delete an issue in the project by its id. It will search the the project then it will search the issue array for an issue with matching id. Then it will remove it with the splice method.
 4. The `put` method: this method will update the issue with the matching id and then saving the project.
  
2. `/api/project`
This is the route which will do the crud operation for the projects. There are 3 methods in this route:
 1. The `post` method: this method will add new project to the database.
 2. The `get` method: this method will get all projects in the database but only it's id and project Name.
 3. The `delete` method: this method will delete an project in the database by it's name.

Other than the files above i have to also make javascript files for each html or ejs file that will send the ajax request and uses the data to render the required elements.
### views
1. `index.html`: this file will be served in the main route where it will render forms for user to interact with the issue tracker. Each form has an submit event listener that will make the corresponding ajax request based on the form. This is ajax requests are located in the indexScript.js file.
2. `issue.ejs`: this file will be served in the `/:project/` where it will render all of the issues in the project by calling an ajax get request that is located in the issueScript.js file. User can also alter the issues in the project in this file.
3. `projects.html`: this file will be served in the `/api/projects` where it will render all of the project returned from the ajax get request located in projectScript.js. There are also buttons for each project that will re direct to the `/:project/` route where users can view the issues of the project.

### public
There are 3 javascript files that contain the script that will make the ajax request for each files in the html folder.
1. indexScript.js: this file contains all ajax requests that will be called when the submit button for each forms are clicked.
2. issueScript.js: this file contains all ajax request for the crud operation for the issues in the projects. Other than that when the document is ready it will call an ajax request that will get the data of all issues that matched the filter and then renders it.
3. projectScript.js: this file contains an ajax request that will get all available project from the database and render it.

### 2_functional-tests.js
This is where the testing for the issue tracker is written. There are 11 test in total that we need to create and pass in order to fulfill the user stories.

### Instruction from FreeCodeCamp's Boilerplate README 
1. SET NODE_ENV to `test` without quotes and set DB to your mongo connection string in .env file
2. Complete the project in `routes/api.js` or by creating a handler/controller
3. You will add any security features to `server.js`
4. You will create all of the functional tests in `tests/2_functional-tests.js`

