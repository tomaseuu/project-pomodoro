
let userTimers = {};

const getCurrentTimestamp = () => new Date().getTime();

const startTimer = (userId, timerId) => {
    if (!userTimers[userId]) {
        userTimers[userId] = {};
    }

    if (!userTimers[userId][timerId]) {
        userTimers[userId][timerId] = {
            startTime: getCurrentTimestamp(),
            totalElapsedTime: 0
        };
        return { success: true, message: `Timer ${timerId} started for user ${userId}` };

            } else if (!userTimers[userId][timerId].startTime) {

        // Start timer if it’s currently stopped
        userTimers[userId][timerId].startTime = getCurrentTimestamp();
        return { success: true, message: `Timer ${timerId} restarted for user ${userId}` };
    } else {
        return { success: false, message: `Timer ${timerId} is already running for user ${userId}` };
    }
};

const stopTimer = (userId, timerId) => {
    const timer = userTimers[userId]?.[timerId];
    if (timer && timer.startTime) {
        const elapsedTime = getCurrentTimestamp() - timer.startTime;
        timer.totalElapsedTime += elapsedTime; // Add to cumulative total
        delete timer.startTime; // Reset start time to allow future start

        return {
            success: true,
            message: `Timer ${timerId} stopped for user ${userId}`,
            totalElapsedTime: (timer.totalElapsedTime / (1000 * 60 * 60)).toFixed(2) // Convert to hours
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
            totalElapsedTime: (timer.totalElapsedTime / (1000 * 60 * 60)).toFixed(2) // Convert to hours
        };
    } else {
        return { success: false, message: `No timer ${timerId} found for user ${userId}` };
    }
};

export { startTimer, stopTimer, getTotalElapsedTime };


      

