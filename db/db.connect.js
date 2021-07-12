const mongoose = require("mongoose");
const uri = process.env.DATABASE;

function initializeDbConnection() {
mongoose.connect( uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(()=> console.log("connection to database - SUCCESSFUL!!"))
.catch(err => console.log("mongoose connection failed... ",err.message));
}


module.exports = {initializeDbConnection};