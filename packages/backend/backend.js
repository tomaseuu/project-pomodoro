// backend.js
import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Hi Everyone!");
});



app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});