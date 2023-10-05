const express = require("express");
const posts = express.Router();
const validatePost = require("../middlewares/validatePost");
const PostModel = require("../models/post");

posts.get("/posts", async (req, res) => {
  const { page = 1, pageSize = 12 } = req.query;

  
  try {
    const posts = await PostModel.find()
    .limit(pageSize)
      .skip((page - 1) * pageSize)
    
    const totalPosts = await PostModel.count()
    
    res.status(200).send({
      statusCode: 200,
      currentPage: Number(page),
      totalPages: Math.ceil(totalPosts / pageSize),
      totalPosts,
      message: "Posts fetched successfully",
      posts,
    });
  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: "Error interno del server",
    });
  }
});

posts.get("/posts/byTitle", async (req, res) => {
  const { title } = req.query;
  try {
    const posts = await PostModel.find({
      title: { $regex: title, $options: "i" },
    });

    res.status(200).send({
      statusCode: 200,
      message: "Posts fetched successfully",
      posts,
    });
  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: "Error interno del server",
    });
  }
});

posts.get("/posts/:postId", async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await PostModel.findById(postId);

    if (!post) {
      return res.status(404).send({
        statusCode: 404,
        message: "Post not found",
      });
    }

    res.status(200).send({
      statusCode: 200,
      message: "Post fetched successfully",
      post,
    });
  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: "Error interno del server",
    });
  }
});

posts.post("/posts/create", validatePost, async (req, res) => {
  const newPost = new PostModel({
    title: req.body.title,
    category: req.body.category,
    cover: req.body.cover,
    readTime: {
      value: req.body.readTime.value,
      unit: req.body.readTime.unit,
    },
    author: {
      name: req.body.author.name,
      avatar: req.body.author.avatar,
    },
    content: req.body.content,
  });

  try {
    const post = await newPost.save();

    res.status(201).send({
      statusCode: 201,
      message: "Post saved successfully",
      payload: post,
    });
  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: "Error interno del server",
    });
  }
});

posts.patch("/posts/update/:postId", async (req, res) => {
  const { postId } = req.params;

  const postExist = await PostModel.findById(postId);

  if (!postExist) {
    return res.status(404).send({
      statusCode: 404,
      message: "Post not found",
    });
  }

  try {
    const dataToUpdate = req.body;
    const options = { new: true };
    const result = await PostModel.findByIdAndUpdate(
      postId,
      dataToUpdate,
      options
    );

    res.status(200).send({
      statusCode: 200,
      message: "Post updated successfully",
      payload: result,
    });
  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: "Error interno del server",
    });
  }
});

posts.delete("/posts/delete/:postId", async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await PostModel.findByIdAndDelete(postId);
    if (!post) {
      return res.status(404).send({
        statusCode: 404,
        message: "Post not found or already deleted",
      });
    }
    res.status(200).send({
      statusCode: 200,
      message: "Post deleted successfully",
    });
  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: "Error interno del server",
    });
  }
});

module.exports = posts;
