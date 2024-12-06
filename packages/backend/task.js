import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import { addTask, getTasks, deleteTaskById, updateTaskById, toggleTaskCompletion } from './task-services.js';

const app = express();
const port = process.env.PORT || 3001;

mongoose.connect("mongodb+srv://<username>:<password>@<cluster-url>/<database>?retryWrites=true&w=majority")
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

app.use(cors({ origin: 'https://ashy-coast-0b352fa1e.5.azurestaticapps.net' }));
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Task API is running. Use /tasks for task endpoints.');
});

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

