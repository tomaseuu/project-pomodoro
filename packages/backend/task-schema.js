//task_schema
import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
<<<<<<< HEAD
    {
      userId: { type: String, required: true },
      task: { type: String, required: true, trim: true },
      completed: { type: Boolean, default: false }
    },
    { collection: "Tasks" }
=======
  {
    userId: { type: String, required: true },
    task: { type: String, required: true },
    completed: { type: Boolean, default: false },
  },
  { collection: "Tasks" }
>>>>>>> f684cdc89f2aafc7077ccca15598ea2d3451503e
);

const Task = mongoose.model("Task", TaskSchema);

export default Task;
