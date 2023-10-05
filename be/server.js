const express = require("express");
const mongoose = require("mongoose");
const postsRoute = require("./routes/posts");
const usersRoute = require("./routes/users");
const logger = require("./middlewares/logger");
require("dotenv").config();
const PORT = 5050;
const cors = require("cors");

const app = express();

//ci serve per interpretare il body delle richieste
app.use(express.json());
app.use(logger)
app.use(cors());

//routes
app.use("/", postsRoute);
app.use("/", usersRoute);

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database successfully connected");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
