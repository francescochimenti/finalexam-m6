const express = require("express");
const mongoose = require("mongoose");
const postsRoute = require("./routes/posts");
const authorsRoute = require("./routes/authors");
const loginRoute = require("./routes/login");
const mailRoute = require("./routes/sendMail");
const githubRoute = require("./routes/github");
const logger = require("./middlewares/logger");
require("dotenv").config();

const PORT = 5050;
const cors = require("cors");
const app = express();

// Middleware to parse the request body as JSON
app.use(express.json());

// Custom middleware to log incoming requests
app.use(logger);

// Middleware to enable CORS
app.use(cors());

// Routes
app.use("/", postsRoute);
app.use("/", authorsRoute);
app.use("/", loginRoute);
app.use("/", mailRoute);
app.use("/", githubRoute);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// Log any errors that occur while connecting to the database
db.on("error", console.error.bind(console, "connection error"));

// Log a success message once the database connection is established
db.once("open", () => {
  console.log("Database successfully connected");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
