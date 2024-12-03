
import mongoose from "mongoose";
import userModel from "./user_schema.js";
import dotenv from "dotenv";

mongoose.set("debug", true);
dotenv.config()

const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/pomodoro";

mongoose
  .connect(mongoUri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));


function getUsers(username) {
  let promise;
  if (username === undefined) {
    promise = userModel.find();
  } else if (username) {
    promise = findUserByUsername(username);
  }
  return promise;
}

function findUserByUsername(username) {
  return userModel.find({ username: username });
}

function findUserById(id) {
  return userModel.findById(id);
}

function addUser(user) {
  const userToAdd = new userModel(user);
  const promise = userToAdd.save();
  return promise;
}

function deleteUserById(id) {
  return userModel.findByIdAndDelete(id)
  .then((result) => {
   console.log("User deleted:", result); // Log the result
   return result;
   }).catch((error) => {
   console.log("Error deleting user:", error); // Log the error
   throw error;
 });
}

function updateUserById(id, updatedUser) {
  return userModel.findByIdAndUpdate(id, updatedUser, {new: true});
}


export default {
  addUser,
  getUsers,
  findUserById,
  findUserByUsername,
  deleteUserById,
  updateUserById
};
