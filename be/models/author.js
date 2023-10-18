const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    birthday: {
      type: String,
      required: false,
    },
    avatar: {
      type: String,
      required: false,
      default: "https://picsum.photos/200/300",
    },
  },
  { timestamps: true, strict: true }
);

module.exports = mongoose.model("authorModel", AuthorSchema, "authors");
