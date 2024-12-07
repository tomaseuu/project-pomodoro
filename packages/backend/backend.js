import express from "express";
import cors from "cors";
import path from "path";
import user_services from "./user_services.js";
import { registerUser, authenticateUser } from "./auth.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: 'https://ashy-coast-0b352fa1e.5.azurestaticapps.net' }));
app.use(express.json());

app.post("/signup", registerUser);
app.post("/login", authenticateUser);

app.get("/", (req, res) => {
  res.send("Hi Everyone!");
});

app.get("/users", (req, res) => { 
  const username = req.query.username;
  user_services.getUsers(username)
    .then((result) => res.send({ users: result || [] }))
    .catch(() => res.status(404).send("Users Not Found"));
});

app.get("/users/:username/calendar", (req, res) => { 
  res.status(501).send({ message: "Not Implemented" });
});

app.post("/users", authenticateUser, (req, res) => { 
  const userId = idGen(6);
  const userToAdd = { id: userId, ...req.body };
  user_services.addUser(userToAdd)
    .then((result) => res.status(201).send(result))
    .catch(() => res.status(400).send("Password or Email Invalid"));
});

app.patch('/users/:id', authenticateUser, (req, res) => {
  const id = req.params.id; 
  const updatedUser = { id, ...req.body };
  user_services.updateUserById(id, updatedUser)
    .then((result) => res.status(200).send(result));
});

app.delete("/users/:id", authenticateUser, (req, res) => {
  const id = req.params.id; 
  user_services.deleteUserById(id)
    .then(() => res.status(204).send())
    .catch(() => res.status(404).send("User Not Found"));
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "project-pomodoro/packages/frontend/dist", "index.html"));
});

const idGen = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
};

app.listen(port, () => {
  console.log(`Example app listening at port ${port}`);
});
