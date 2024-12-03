// backend.js
import express from "express";
import cors from "cors";
import user_services from "./user_services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const idGen = (length) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let i = 0;
  while (i < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    i += 1;
  }
  return result;
}

app.get("/", (req, res) => {
  res.send("Hi Everyone!");
});

app.get("/users", (req, res) => { 
  const username = req.query.username;
  user_services.getUsers(username)
  .then((result) => {
    if (result) {
      const users = {users: result}
      res.send(users)
    } else {
      res.send([]);
    }
  })
  .catch((error) => {
    res.status(404).send("Users Not Found")
  });
});

app.get("/users/:username/calendar", (req, res) => { 
  const username = req.query.username;
  // ... //
});

app.post("/users", (req, res) => { // 201
  const userId = idGen(6);
  const userToAdd = {id: userId, username: req.body.username, email: req.body.email, password: req.body.password};
  user_services.addUser(userToAdd).then((result) => 
    res.status(201).send(result))
  .catch((error) => {
    res.status(400).send("Password or Email Invalid")
  });
});

app.patch('/users/:id', (req, res) => {
  const id = req.params.id; 
  const updatedUser = {id: id, username: req.body.username, email: req.body.email, password: req.body.password};
  user_services.updateUserById(id, updatedUser).then((result) =>
    res.status(200).send(result));
});

app.delete("/users/:id", (req, res) => {
  const id = req.params.id; 
  console.log("Deleting user with ID:", id); // Debugging line
  user_services.deleteUserById(id).then((result) => {
      res.status(204).send(result);
  })
  .catch((error) => {
    res.status(404).send("User Not Found")
  });
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});