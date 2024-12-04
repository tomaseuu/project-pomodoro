//task_schema
import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    task: { type: String, required: true },
    completed: { type: Boolean, default: false },
  },
  { collection: "Tasks" }
);

const Task = mongoose.model("Task", TaskSchema);

export default Task;
