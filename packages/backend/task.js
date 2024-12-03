//task.js
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import { addTask, getTasks, deleteTaskById, updateTaskById, toggleTaskCompletion } from './task-services.js';

const app = express();
const port = 3001;

mongoose.connect("mongodb://localhost:27017/pomodoro")
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Task API is running. Use /tasks for task endpoints.');
});

//Route to add a task
app.post('/tasks', async (req, res) => {
    const { userId, task } = req.body;

    if (!userId || !task) {
        return res.status(400).json({ success: false, message: 'UserId and task content are required' });
    }

    const result = await addTask(userId, { task });

    if (result.success) {
        return res.status(201).json(result);
    } else {
        return res.status(500).json(result);
    }
});

//Route to get a task
app.get('/tasks', async (req, res) => {
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({ success: false, message: 'UserId is required' });
    }

    const result = await getTasks(userId);

    if (result.success) {
        console.log("getting task for user: ", userId)
        console.log("tasks from getTask(): ", result)
        return res.status(201).json(result);
    } else {
        return res.status(500).json(result);
    }
});

//Route to delete a task
app.delete('/tasks/:taskId', async (req, res) => {
    const { userId } = req.query;
    const { taskId } = req.params;

    if (!userId || !taskId) {
        return res.status(400).json({ success: false, message: 'UserId and TaskId are required'});
    }

    const result = await deleteTaskById(userId, taskId);

    if (result.success) {
        return res.status(201).json(result);
    } else {
        return res.status(500).json(result);
    }
});

//Route to update a task
app.patch('/tasks/:taskId', async (req, res) => {
    const { userId } = req.body;
    const { taskId } = req.params;
    const updates = req.body;

    if (!userId || !taskId) {
        return res.status(400).json({ success: false, message: 'UserId and TaskId are required' });
    }

    const result = await updateTaskById(userId, taskId);

    if (result.success) {
        return res.status(201).json(result);
    } else {
        return res.status(500).json(result);
    }
});

//Route to toggle a task
app.post('/tasks/:taskId/toggle', async (req, res) => {
    const { userId } = req.body;
    const { taskId } = req.params;

    if (!userId || !taskId) {
        return res.status(400).json({ success: false, message: 'UserId and TaskId are required' });
    }

    const result = await toggleTaskCompletion(userId, taskId);

    if (result.success) {
        return res.status(201).json(result);
    } else {
        return res.status(500).json(result);
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

