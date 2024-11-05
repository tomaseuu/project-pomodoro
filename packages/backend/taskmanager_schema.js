import mongoose from "mongoose";
import Task from "./task_schema.js";
const TaskManagerSchema = new mongoose.Schema(
    {
      TaskManagerDate: {
        type: Date,
        required: true,
        trim: true,
      },
      TasksList: [ Task ]
    }
);

const TaskManager = mongoose.model("TaskManager", TaskManagerSchema);
  
export default TaskManager;