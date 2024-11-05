import mongoose from "mongoose";
import Day from "./day_schema.js"
const MonthSchema = new mongoose.Schema(
  {
    month: {
        type: String,
        required: true,
        trim: true
    },
    days:[ Day ]
  }
);

const Month = mongoose.model("Month", MonthSchema);

export default Month;