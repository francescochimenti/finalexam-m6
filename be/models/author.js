const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      default: "Unknown",
    },
    lastName: {
      type: String,
      required: true,
      default: "Unknown",
    },
    email: {
      type: String,
      required: true,
    },
    birthday: {
      type: Number,
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