import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import { startTimer, stopTimer, getTotalElapsedTime, resetTotalElapsedTime } from './timer-services.js';

const app = express();
const port = process.env.PORT || 3000;

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("Error connecting to MongoDB:", error));

// Middleware
app.use(cors({ origin: 'https://ashy-coast-0b352fa1e.5.azurestaticapps.net' }));
app.use(express.json());

// Routes

// Root Route
app.get('/', (req, res) => {
    res.send('Timer API is running. Use /start, /stop, and /total/:userId/:timerId endpoints.');
});

// Start Timer
app.post('/start', async (req, res) => {
    console.log("POST /start called with body: ", req.body);

    const { userId, timerId } = req.body;
    if (!userId || !timerId) {
        console.error("Missing userId or timerId");
        return res.status(400).json({ success: false, message: 'UserId and TimerId are required' });
    }

    try {
        const result = await startTimer(userId, timerId);
        if (result.success) {
            console.log("Timer started successfully:", result);
            return res.status(200).json({ success: true, message: "Timer started", data: result });
        } else {
            console.error("Failed to start timer:", result);
            return res.status(400).json({ success: false, message: "Failed to start timer", data: result });
        }
    } catch (error) {
        console.error("Error starting timer:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// Stop Timer
app.post('/stop', async (req, res) => {
    const { userId, timerId } = req.body;
    if (!userId || !timerId) {
        return res.status(400).json({ success: false, message: 'UserId and TimerId are required' });
    }

    try {
        const result = await stopTimer(userId, timerId);
        if (result.success) {
            return res.status(200).json({ success: true, message: "Timer stopped", data: result });
        } else {
            return res.status(400).json({ success: false, message: "Failed to stop timer", data: result });
        }
    } catch (error) {
        console.error("Error stopping timer:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// Get Total Elapsed Time
app.get('/total/:userId/:timerId', async (req, res) => {
    const { userId, timerId } = req.params;

    try {
        const result = await getTotalElapsedTime(userId, timerId);
        if (result.success) {
            return res.status(200).json({ success: true, message: "Total elapsed time retrieved", data: result });
        } else {
            return res.status(404).json({ success: false, message: "Timer not found" });
        }
    } catch (error) {
        console.error("Error retrieving total elapsed time:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// Reset Total Elapsed Time
app.post('/resetElapsed', async (req, res) => {
    const { userId, timerId } = req.body;

    if (!userId || !timerId) {
        return res.status(400).json({ success: false, message: 'UserId and TimerId are required' });
    }

    try {
        const result = await resetTotalElapsedTime(userId, timerId);
        if (result.success) {
            return res.status(200).json({ success: true, message: "Elapsed time reset", data: result });
        } else {
            return res.status(404).json({ success: false, message: "Failed to reset elapsed time" });
        }
    } catch (error) {
        console.error("Error resetting elapsed time:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// Start the Server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
