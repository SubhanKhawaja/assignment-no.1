// const express = require('express')
// const app = express()
// const port = 3000

// app.get('/', (req, res) => {
//   res.send("<h1>Hello !</h1>")
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory data storage
let tasks = [
    { id: 1, taskName: "Learn Express.js" },
    { id: 2, taskName: "Study API Testing" }
];
let nextId = 3;

// POST /addTask - Add new task
app.post('/addTask', (req, res) => {
    const { taskName } = req.body;
    if (!taskName) {
        return res.status(400).json({ error: 'Task name is required' });
    }
    
    const newTask = {
        id: nextId++,
        taskName: taskName
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// GET /tasks - Show all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// DELETE /task/:id - Delete task by id
app.delete('/task/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const initialLength = tasks.length;
    
    tasks = tasks.filter(task => task.id !== taskId);
    
    if (tasks.length === initialLength) {
        return res.status(404).json({ error: 'Task not found' });
    }
    
    res.status(200).json({ message: 'Task deleted successfully' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});