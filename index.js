const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());

const { initializeDbConnection } = require("./db/db.connect");
const productRouter = require("./routes/product.route.js");
const userRouter = require("./routes/user.route.js");
const cartRouter = require("./routes/cart.route.js");

// calling mongoose connection before route handler
initializeDbConnection();

app.use(morgan("dev"));
app.use("/api", productRouter);
app.use("/api", userRouter);
app.use("/api/cart", cartRouter);

app.get("/", (req, res) => {
  res.send("hello world")
})


app.listen(PORT, () => {
  console.log("Server connected to port - ", PORT);
});