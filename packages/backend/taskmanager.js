import mongoose from "mongoose";
import Task from "./task";
const TaskManagerSchema = new mongoose.Schema(
    {
      TaskManagerDate: {
        type: Date,
        required: true,
        trim: true,
      },
      TasksList: [ Task ]
    },
    { collection: "Tasks" }
);

const TaskManager = mongoose.model("TaskManager", TaskManagerSchema);
  
export default TaskManager;