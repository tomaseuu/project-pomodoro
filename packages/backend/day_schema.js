import mongoose from "mongoose";
import TaskManager from "./taskmanager_schema";

const DaySchema = new mongoose.Schema(
  {
    taskmanager: {
        type: TaskManager
    }
  }
);

const Day = mongoose.model("Day", DaySchema);

export default Day;