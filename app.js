const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// SQLite database setup
const dbFile = 'tasks.db';
const db = new sqlite3.Database(dbFile); // Using a file-based database

db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, completed BOOLEAN)');
});

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Welcome to the To-Do List Manager!');
});

// API endpoints
app.get('/tasks', (req, res) => {
  db.all('SELECT * FROM tasks', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Retrieve a specific task by ID
app.get('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  db.get('SELECT * FROM tasks WHERE id = ?', taskId, (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }
    res.json(row);
  });
});


app.post('/tasks', (req, res) => {
  const { title } = req.body;
  db.run('INSERT INTO tasks (title, completed) VALUES (?, ?)', [title, false], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID });
  });
});

app.put('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const { title, completed } = req.body;
  db.run('UPDATE tasks SET title = ?, completed = ? WHERE id = ?', [title, completed, taskId], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Task updated successfully' });
  });
});

app.delete('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  db.run('DELETE FROM tasks WHERE id = ?', taskId, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Task deleted successfully' });
  });
});

// Export SQLite to .db file
app.get('/export/db', (req, res) => {
  const backupFile = 'backup.db';
  const backup = fs.createWriteStream(backupFile);
  const dbBackup = db.backup(backup);

  dbBackup.on('finish', () => {
    res.json({ message: `Exported SQLite database to ${backupFile}` });
  });

  dbBackup.on('error', (err) => {
    res.status(500).json({ error: err.message });
  });
});

// Export SQLite to .json file
app.get('/export/json', (req, res) => {
  const jsonFile = 'backup.json';
  db.all('SELECT * FROM tasks', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    fs.writeFile(jsonFile, JSON.stringify(rows, null, 2), (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ message: `Exported SQLite data to ${jsonFile}` });
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
