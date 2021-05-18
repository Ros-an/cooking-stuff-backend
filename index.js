const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");


const PORT = process.env.PORT;
const app = express();




app.get("/", (req, res) => {
  res.send("hello world")
})


app.listen(PORT, () => {
  console.log("Server connected to port - ",PORT);
});