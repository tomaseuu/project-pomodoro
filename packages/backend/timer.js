// timer.js

import express from 'express';
import cors from 'cors';
import { startTimer, stopTimer, getTotalElapsedTime } from './timer-services.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Timer API is running. Use /start, /stop, and /total/:userId/:timerId endpoints.');
});

// Route to start a new timer
app.post('/start', (req, res) => {

    console.log("POST /start called with body: ", req.body); //debug

    const { userId, timerId } = req.body;
    if (!userId || !timerId) {
        console.error("missing userId or timerId"); //debug
        return res.status(400).json({ success: false, message: 'UserId and TimerId are required' });
    }

    const result = startTimer(userId, timerId);
    if (result.success) {
        console.log("result: ", result); //debug
        return res.status(200).json(result);
    } else {
        return res.status(400).json(result);
    }
});

// Route to stop a timer and update total elapsed time
app.post('/stop', (req, res) => {
    const { userId, timerId } = req.body;
    if (!userId || !timerId) {
        return res.status(400).json({ message: 'UserId and TimerId are required' });
    }

    const result = stopTimer(userId, timerId);
    if (result.success) {
        return res.status(200).json(result);
    } else {
        return res.status(400).json(result);
    }
});

// Route to get total elapsed time for a user's timer
app.get('/total/:userId/:timerId', (req, res) => {
    const { userId, timerId } = req.params;
    const result = getTotalElapsedTime(userId, timerId);

    if (result.success) {
        return res.status(200).json(result);
    } else {
        return res.status(404).json({ success: false, message: "Timer not found" });
    }
});



app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
