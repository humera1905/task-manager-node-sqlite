Task Manager
Task Manager is a simple web application for managing to-do list. It allows to add, update, delete tasks, and view task details. The application is built using HTML, CSS, JavaScript, and Node.js with SQLite as the database.

Table of Contents
    Features
    Usage
    Themes
    API Endpoints
    Exporting Data
    Contributing
    License

Features:
    Task List: View a list of tasks on the home page.
    Add Task: Add new tasks to the list.
    Update Task: Modify the title and status (completed or incomplete) of a task.
    Delete Task: Remove a task from the list.
    Task Details: View detailed information about a specific task.

Getting Started:
    cd task-manager
    Install Dependencies:
        npm install
        Run the Application:
        npm start
        Visit http://localhost:3000 in browser.

Usage:
    Home Page (home.html): The landing page welcomes to the Task Manager. Add tasks and view the task list.

    Task List (task-list.html): Displays the list of tasks. Update or delete tasks.

    Task Details (task-details.html): View detailed information about a specific task. Select a task ID from the dropdown and click "Show Task Details."

    Settings (settings.html): Configure theme settings and enable/disable notifications.

Themes:
The application supports two themes: Light and Dark.
Change the theme in the "Settings" page.
    API Endpoints
    GET /tasks: Retrieve a list of all tasks.
    GET /tasks/:id: Retrieve details of a specific task by ID.
    POST /tasks: Add a new task.
    PUT /tasks/:id: Update the title and status of a task.
    DELETE /tasks/:id: Delete a task.

Exporting Data:
Use the provided API endpoints /export/db and /export/json to export data to a SQLite database file or a JSON file, respectively.