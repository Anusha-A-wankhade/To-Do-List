# Project todo-app

## Setup
1. Clone the repository: ``
2. Install dependencies: `npm install`
3. Start the server: `json-server --watch db.json --port 3000`![Screenshot 2024-09-27 230348](https://github.com/user-attachments/assets/24bdb22b-a4fc-4cb3-aaca-1bce2645abac)

4. Start the frontend: `npm run start`
5. Postman Api Testing Link: `https://martian-station-180690.postman.co/workspace/My-Workspace~b65f0d5c-7e77-4731-84cf-89d156ec5fcd/collection/27347046-7d32e18a-9e45-4c96-b6fb-b5554bcaf348?action=share&creator=27347046&active-environment=27347046-b9dd49ba-9ac7-4380-bc6c-9805569c60c3`

## API Endpoints

### Create a new task![Screenshot 2024-09-27 230448](https://github.com/user-attachments/assets/03c4e6fd-fb6d-41a1-b9e5-c7250fdd7a82)

* Method: POST
* Endpoint: `/tasks`
* Request Body: `user`, `dueDate`, `status`, `priority`, `comment`
* Response: `201 Created` with the created tasks

### Retrieve all task
* Method: GET
* Endpoint: ` /tasks`
* Response: `200 OK` with an array of tasks

### Retrieve a single task by its unique identifier
* Method: GET
* Endpoint: `/tasks/id`
* Response: `200 OK` with the retrieved tasks or `404 Not Found` if the tasks does not exist

### Update a task by its unique identifier
* Method: PUT
* Endpoint: `/tasks/id`
* Request Body: `user`, `dueDate`, `status`, `priority`, `comment`
* Response: `200 OK` with the updated tasks or `404 Not Found` if the tasks does not exist

### Delete a task by its unique identifier
* Method: DELETE
* Endpoint: `/tasks/id`
* Response: `200 OK`  If the task was successfully deleted. or `404 Not Found` If the task with the specified ID doesn't exist.
