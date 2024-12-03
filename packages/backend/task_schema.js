const mongoose = require("mongoose");

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

module.exports = mongoose.model("Task", TaskSchema);