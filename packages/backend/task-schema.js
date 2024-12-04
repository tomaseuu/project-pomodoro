import mongoose from "mongoose";


const TaskSchema = new mongoose.Schema(
    {
      Task: {
        type: String,
        required: true,
        trim: true,
      }
    },
    { collection: "Tasks" }
);

const Task = mongoose.model("Task", TaskSchema);

export default Task;