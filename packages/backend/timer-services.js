import timerModel from "./timer-schema.js"

const getCurrentTimestamp = () => new Date().getTime();

const startTimer = async (userId, timerId) => {

    try {
        let timer = await timerModel.findOne({userId, timerId});

        if (!timer) {
            timer = new timerModel({
                userId,
                timerId,
                startTime: getCurrentTimestamp(),
                totalElapsedTime: 0,
            });
            await timer.save(); 
            return { success: true, message: `Timer ${timerId} started for user ${userId}` };
        } else if (!timer.startTime) {
            timer.startTime = getCurrentTimestamp();
            await timer.save();
            return { success: true, message: `Timer ${timerId} restarted for user ${userId}`};

        } else {
            return { success: false, message: `Timer ${timerId} is already running for user ${userId}` };
        }
    } catch (error) {
        console.error("Error starting timer: ", error);
        return { success: false, message: "Internal server failure."};
    }
};

const stopTimer = async (userId, timerId) => {

    try {
        let timer = await timerModel.findOne({userId, timerId});

        if (timer && timer.startTime) {
            const elapsedTime = getCurrentTimestamp() - timer.startTime;
            timer.totalElapsedTime += elapsedTime;
            timer.startTime = null;
            await timer.save();
            return {
                success: true,
                message: `Timer ${timerId} stopped for user ${userId}`,
                totalElapsedTime: (timer.totalElapsedTime / (1000)).toFixed(2) 
            };
        } else {
            return { success: false, message: `No active timer ${timerId} for user ${userId}`};
        }
    } catch (error) {
        console.error("Error stopping timer: ", error);
        return { success: false, message: "Internal server failure."}
    }
};
    
const getTotalElapsedTime = async (userId, timerId) => {

    try {
        const timer = await timerModel.findOne({ userId, timerId });

        if (timer) { 
            return {
                success: true,
                totalElapsedTime: (timer.totalElapsedTime / (1000)).toFixed(2) 
            };
        } else {
            return { success: false, message: `No timer ${timerId} found for user ${userId}` };
        }
    } catch (error) {
        console.error("Error getting total elapsed time: ", error);
        return { success: false, message: "Internal server failure."}
    }
};

const resetTotalElapsedTime = async (userId, timerId) => {

    try {
        const timer = await timerModel.findOne({ userId, timerId });

        if (timer) {
            timer.totalElapsedTime = 0;
            timer.startTime = null;
            await timer.save();
            return {
                success: true,
                message: `Elapsed time for timer ${timerId} reset for user ${userId}`,
            };
        } else {
            return { success: false, message: `No timer ${timerId} found for user ${userId}` };
        }
    } catch (error) {
        console.error("Error reseting total elapsed time: ", error);
        return { success: false, message: "Internal server failure."}
    }
}

export { startTimer, stopTimer, getTotalElapsedTime, resetTotalElapsedTime };


      

