
document.addEventListener('DOMContentLoaded', () => {
  const taskList = document.getElementById('task-list');
  const addTaskForm = document.getElementById('add-task-form');
  // Fetch tasks from the server and display them
  fetchTasks();

  // Add task event listener
  addTaskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const taskTitle = document.getElementById('task-title').value;
    addTask(taskTitle);
  });

  function fetchTasks() {
    fetch('/tasks')
      .then(response => response.json())
      .then(tasks => {
        displayTasks(tasks);
      });
  }


  
  function displayTasks(tasks) {
    taskList.innerHTML = '';
    tasks.forEach(task => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${task.title}</span>
        <span>
          <button onclick="updateTask(${task.id})">Update</button>
          <button onclick="deleteTask(${task.id})">Delete</button>
        </span>`;
      taskList.appendChild(li);
    });
  }

  function addTask(title) {
    fetch('/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    })
    .then(response => response.json())
    .then(() => {
      fetchTasks();
    });
  }

  window.updateTask = function (taskId) {
    const newTitle = prompt('Enter the new title for the task:');
    if (newTitle !== null) {
      const newStatus = prompt('Enter the new status for the task (true/false):');
      if (newStatus !== null) {
        // Ensure the entered status is a boolean
        const parsedStatus = JSON.parse(newStatus.toLowerCase());
  
        if (typeof parsedStatus === 'boolean') {
          fetch(`/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: newTitle, completed: parsedStatus }),
          })
            .then(response => response.json())
            .then(() => {
              fetchTasks();
            });
        } else {
          alert('Invalid status. Please enter true or false.');
        }
      }
    }
  };

  window.deleteTask = function (taskId) {
    const confirmation = confirm('Are you sure you want to delete this task?');
    if (confirmation) {
      fetch(`/tasks/${taskId}`, {
        method: 'DELETE',
      })
        .then(response => response.json())
        .then(() => {
          fetchTasks();
        });
    }
  };
});


