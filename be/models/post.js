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
      required: true,
    },
    readTime: {
      value: {
        type: Number,
        required: false,
      },
      unit: {
        type: String,
        required: false,
        default: "minutes",
      },
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "authorModel",
    },
    content: {
      type: String,
      required: false,
    },
    comments: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "commentModel",
    },
  },
  { timestamps: true, strict: true }
);

module.exports = mongoose.model("postModel", PostSchema, "posts");
