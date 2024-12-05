// timer.js
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import { startTimer, stopTimer, getTotalElapsedTime, resetTotalElapsedTime } from './timer-services.js';

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect("mongodb+srv://<username>:<password>@<cluster-url>/<database>?retryWrites=true&w=majority")
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

app.use(cors({ origin: 'https://ashy-coast-0b352fa1e.5.azurestaticapps.net/' }));
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Timer API is running. Use /start, /stop, and /total/:userId/:timerId endpoints.');
});

// Route to start a new timer
app.post('/start', async (req, res) => {

    console.log("POST /start called with body: ", req.body); //debug

    const { userId, timerId } = req.body;
    if (!userId || !timerId) {
        console.error("missing userId or timerId"); //debug
        return res.status(400).json({ success: false, message: 'UserId and TimerId are required' });
    }

    const result = await startTimer(userId, timerId);
    if (result.success) {
        console.log("result: ", result); //debug
        return res.status(200).json(result);
    } else {
        return res.status(400).json(result);
    }
});

// Route to stop a timer and update total elapsed time
app.post('/stop', async (req, res) => {
    const { userId, timerId } = req.body;
    if (!userId || !timerId) {
        return res.status(400).json({ message: 'UserId and TimerId are required' });
    }

    const result = await stopTimer(userId, timerId);
    if (result.success) {
        return res.status(200).json(result);
    } else {
        return res.status(400).json(result);
    }
});

// Route to get total elapsed time for a user's timer
app.get('/total/:userId/:timerId', async (req, res) => {
    const { userId, timerId } = req.params;
    const result = await getTotalElapsedTime(userId, timerId);

    if (result.success) {
        return res.status(200).json(result);
    } else {
        return res.status(404).json({ success: false, message: "Timer not found" });
    }
});

app.post('/resetElapsed', async (req, res) => {
    const { userId, timerId } = req.body;

    if (!userId || !timerId) {
        return res.status(400).json({ message: 'UserId and TimerId are required' });
    }

    const result = await resetTotalElapsedTime(userId, timerId);

    if (result.success) {
        return res.status(200).json(result);
    } else {
        return res.status(404).json({ success: false, message: "Cannot reset elapsed time" });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
