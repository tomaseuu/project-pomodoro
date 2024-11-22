import mongoose from "mongoose";
import taskModel from "./task_schema"
import userModel from "./user_schema"

mongoose.set("debug", true);

mongoose.connect("mongodb://localhost:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).catch((error) => console.log(error));

// function getTask(userId, ) {
//   let promise;
//   if (task === undefined) {
//     promise = userModel.find();
//   } else if (task) {
//     promise = findTaskbyUser(username);
// }


export default {
  addTask,
  getTasks,
  deleteTaskById,
  updateTaskById
};
