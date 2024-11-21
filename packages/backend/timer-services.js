let userTimers = {};

// Predefined durations in milliseconds
const TIMER_DURATIONS = {
    pomodoro: 25 * 60 * 1000, // 25 minutes
    shortBreak: 5 * 60 * 1000, // 5 minutes
    longBreak: 30 * 60 * 1000 // 30 minutes
};

const getCurrentTimestamp = () => new Date().getTime();

const startTimer = (userId, timerId, duration) => {
    if (!userTimers[userId]) {
        userTimers[userId] = {};
    }

    if (!userTimers[userId][timerId]) {
        userTimers[userId][timerId] = {
            startTime: getCurrentTimestamp(),
            duration: duration || TIMER_DURATIONS[timerId] || 0, // Use predefined duration or custom
            totalElapsedTime: 0
        };
        return { success: true, message: `Timer ${timerId} started for user ${userId}` };
    } else if (!userTimers[userId][timerId].startTime) {
        userTimers[userId][timerId].startTime = getCurrentTimestamp();
        return { success: true, message: `Timer ${timerId} restarted for user ${userId}` };
    } else {
        return { success: false, message: `Timer ${timerId} is already running for user ${userId}` };
    }
};

// Stop timer and handle total elapsed time calculation
const stopTimer = (userId, timerId) => {
    const timer = userTimers[userId]?.[timerId];
    if (timer && timer.startTime) {
        const elapsedTime = getCurrentTimestamp() - timer.startTime;
        timer.totalElapsedTime += elapsedTime; 
        delete timer.startTime;

        return {
            success: true,
            message: `Timer ${timerId} stopped for user ${userId}`,
            totalElapsedTime: (timer.totalElapsedTime / (1000 * 60 * 60)).toFixed(2)
        };
    } else {
        return { success: false, message: `No active timer ${timerId} for user ${userId}` };
    }
};

const getTotalElapsedTime = (userId, timerId) => {
    const timer = userTimers[userId]?.[timerId];
    if (timer) {
        return {
            success: true,
            totalElapsedTime: (timer.totalElapsedTime / (1000 * 60 * 60)).toFixed(2)
        };
    } else {
        return { success: false, message: `No timer ${timerId} found for user ${userId}` };
    }
};

export { startTimer, stopTimer, getTotalElapsedTime, TIMER_DURATIONS };
