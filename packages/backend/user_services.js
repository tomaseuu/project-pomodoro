
import mongoose from "mongoose";
import userModel from "./user_schema.js";
import dotenv from "dotenv";

mongoose.set("debug", true);
dotenv.config()

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).catch((error) => console.log(error));


function getUsers(username, email) {
  let promise;
  if (username === undefined && email === undefined) {
    promise = userModel.find();
  } else if (username && !email) {
    promise = findUserByUsername(username);
  } else if (email && !username) {
    promise = findUserByEmail(email);
  }else if (email && username){
    promise = findUserByUsernameAndEmail(username, email)
  }  
  return promise;
}

function findUserByUsername(username) {
  return userModel.find({ username: username });
}

function findUserByEmail(email) {
  return userModel.find({ email: email });
}

function findUserByUsernameAndEmail(username, email) {
  return userModel.find({ username: username, email: email })
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
  findUserByEmail,
  findUserByUsername,
  findUserByUsernameAndEmail,
  deleteUserById,
  updateUserById
};
