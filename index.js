const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");


const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());

const { initializeDbConnection } = require("./db/db.connect");
const { Product, fillDB} = require("./models/product.model");
// calling mongoose connection before route handler
initializeDbConnection();
fillDB();

app.get("/", (req, res) => {
  res.send("hello world")
})


app.listen(PORT, () => {
  console.log("Server connected to port - ",PORT);
});