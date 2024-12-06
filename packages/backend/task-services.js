import mongoose from "mongoose";
import taskModel from "./task-schema.js"

mongoose.set("debug", true);

const addTask = async (userId, taskData) => {
  try {
    const newTask = new taskModel({ ...taskData, userId });
    await newTask.save();
    console.log("new task in add: ", newTask);
    return { success: true, message: "Task added successfully", task: newTask };
 
  } catch (error) {
     console.error("Error adding task: ", error);
     return { success: false, message: "Internal server failure."};
  }
};

const getTasks = async (userId) => {
  try {
    const tasks = await taskModel.find({ userId });
    console.log("tasks found: ", tasks);
    return {success: true, tasks};
  } catch (error) {
    console.error("Error fetching tasks: ", error);
    return {success: false, message: "Internal server failure."};
  }
};

const deleteTaskById = async (userId, taskId) => {
  try {
    const task = await taskModel.findOneAndDelete({ userId, _id: taskId });

    if (task) {
      return {success: true, message: `Task with ID ${taskId} deleted successfully`};
    } else {
      return {success: false, message: `Task with ID ${taskId} not found for user ${userId}` };
    }

  } catch (error) {
    console.error("Error fetching tasks: ", error);
    return {success: false, message: "Internal server failure."};
  }
};

const updateTaskById = async (userId, taskId, updates) => {
  try {
    const task = await taskModel.findOneAndUpdate(
      { userId, _id: taskId },
      updates,
      { new: true }
    );

    if (task) {
      return {success: true, message: "Task updated successfully: ", task};
    
    } else {
      return {success: false, message: `Task with ID ${taskId} not found for user ${userId}`}
    }

  } catch (error) {
    console.error("Error updating task: ", error);
    return {success: false, message: "Internal server failure."};
  }
};

const toggleTaskCompletion = async (userId, taskId) => {
  try {
    const task = await taskModel.findOne({userId, _id: taskId});

    if (task) {
      task.completed = !task.completed;
      await task.save();
      return { success: true, message: "Task completion status toggled", task };
   
    } else {
      return { success: false, message: `Task with ID ${taskId} not found for user ${userId}` };
    }
  
  } catch (error) {
    console.error("Error toggling task: ", error);
    return { success: false, message: "Internal server failure."};
  }
}


export {
  addTask,
  getTasks,
  deleteTaskById,
  updateTaskById,
  toggleTaskCompletion
};
