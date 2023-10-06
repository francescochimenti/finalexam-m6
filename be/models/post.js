const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: false,
      default: "Uncategorized",
    },
    title: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      required: false,
      default: "https://picsum.photos/200/300",
    },
    readTime: {
      value: {
        type: Number,
        required: true,
      },
      unit: {
        type: String,
        required: false,
        default: "minutes",
      },
    },
    author: {
      name: {
        type: String,
        required: true,
      },
      avatar: {
        type: String,
        required: true,
      },
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, strict: true }
);

module.exports = mongoose.model("postModel", PostSchema, "posts");
