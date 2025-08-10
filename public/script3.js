// script3.js
document.addEventListener('DOMContentLoaded', () => {
     const taskIdDropdown = document.getElementById('task-id-dropdown');
  
    // Fetch tasks from the server and populate the dropdown
    fetchTasks();
  
    function fetchTasks() {
      fetch('/tasks')
        .then(response => response.json())
        .then(tasks => {
          // Populate dropdown with task IDs
          tasks.forEach(task => {
            const option = document.createElement('option');
            option.value = task.id;
            option.text = task.id;
            taskIdDropdown.add(option);
          });
        });
    }
  
    // Function to show task details
    window.showTaskDetails = function () {
      const selectedTaskId = taskIdDropdown.value;
      fetch(`/tasks/${selectedTaskId}`)
        .then(response => response.json())
        .then(task => {
          // Display task details in the task-details-container
          document.getElementById('task-title-details').innerText = task.title;
          document.getElementById('task-id-details').innerText = task.id;
          document.getElementById('task-status-details').innerText = task.completed ? 'Completed' : 'Incomplete';
        })
        .catch(error => {
          console.error('Error fetching task details:', error);
        });
    };
  });
  