const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");


const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());

const { initializeDbConnection } = require("./db/db.connect");
// calling mongoose connection before route handler
initializeDbConnection();

app.get("/", (req, res) => {
  res.send("hello world")
})


app.listen(PORT, () => {
  console.log("Server connected to port - ",PORT);
});