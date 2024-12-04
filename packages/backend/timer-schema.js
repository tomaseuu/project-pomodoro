import mongoose from "mongoose";

const timerSchema = new mongoose.Schema ({

    userId: { type: String, required: true },
    timerId: { type: String, required: true },
    startTime: { type: Number, default: null },
    totalElapsedTime: { type: Number, default: 0 },

    });

const Timer = mongoose.model("Timer", timerSchema);

export default Timer;