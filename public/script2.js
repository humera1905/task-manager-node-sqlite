// script.js
/* Theme change event listener */
const themeSelect = document.getElementById('theme-select');
themeSelect.addEventListener('change', () => {
  const selectedTheme = themeSelect.value;
  document.body.className = selectedTheme;
});
const notificationCheckbox = document.getElementById('notification-checkbox');
  // Notification checkbox event listener
  notificationCheckbox.addEventListener('change', () => {
    const enableNotifications = notificationCheckbox.checked;

    if (enableNotifications && Notification.permission !== 'granted') {
      // Request permission to show notifications
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          showNotification('Notifications enabled');
        } else {
          console.log('User denied permission for notifications');
        }
      });
    }
  });

  function showNotification(message) {
    // Display a simple notification
    const notification = new Notification('Task Manager', { body: message });
  }
