const express = require("express");
const posts = express.Router();
const PostModel = require("../models/post");
const CommentModel = require("../models/comment");

const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads",
    format: async (req, file) => "png",
    public_id: (req, file) => file.name,
  },
});

const cloudUpload = multer({ storage: cloudStorage });

posts.post("/posts/upload", cloudUpload.single("cover"), async (req, res) => {
  try {
    res.status(200).json({
      cover: req.file.path,
    });
  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: "Error interno del server",
    });
  }
});

posts.get("/posts", async (req, res) => {
  const { page = 1, pageSize = 6 } = req.query;

  try {
    const posts = await PostModel.find()
      .populate("author", "firstName lastName email avatar birthday")
      .limit(pageSize)
      .skip((page - 1) * pageSize);

    const totalPosts = await PostModel.count();

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
    }).populate("author", "firstName lastName email avatar birthday");
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
    const post = await PostModel.findById(postId).populate(
      "author",
      "firstName lastName email avatar birthday"
    );

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

posts.get("/posts/byAuthor/:authorId", async (req, res) => {
  const { authorId } = req.params;
  try {
    const posts = await PostModel.find({ author: authorId }).populate(
      "author",
      "firstName lastName email avatar birthday"
    );
    if (posts.length === 0) {
      return res.status(404).send({
        statusCode: 404,
        message: "Posts not found",
      });
    }
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

posts.post("/posts/create", async (req, res) => {
  const newPost = new PostModel({
    title: req.body.title,
    category: req.body.category,
    cover: req.body.cover,
    readTime: {
      value: req.body.readTime.value,
      unit: req.body.readTime.unit,
    },
    author: req.body.author,
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
    await CommentModel.deleteMany({ postId: postId });
    const post = await PostModel.findByIdAndDelete(postId);
    if (!post) {
      return res.status(404).send({
        statusCode: 404,
        message: "Post not found or already deleted",
      });
    }
    res.status(200).send({
      statusCode: 200,
      message: "Post and its associated comments deleted successfully",
    });
  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: "Error interno del server",
    });
  }
});

// as the exercise says, we need to create a new route to handle comments, so i decide to integrate it in the same posts file because it's related to posts

posts.get("/posts/:id/comments", async (req, res) => {
  try {
    const postId = req.params.id;
    const comments = await CommentModel.find({ postId: postId }).populate(
      "authorId",
      "firstName lastName email avatar birthday"
    );
    if (comments.length === 0) {
      return res
        .status(404)
        .send({ message: "Nessun commento trovato per questo post." });
    }
    res.status(200).send(comments);
  } catch (error) {
    res.status(500).send({ message: "Errore del server.", error: error });
  }
});

posts.get("/posts/:id/comments/:commentId", async (req, res) => {
  try {
    const { id, commentId } = req.params;
    const comment = await CommentModel.findOne({ _id: commentId, postId: id });
    if (!comment) {
      return res.status(404).send({ message: "Commento non trovato." });
    }
    res.status(200).send(comment);
  } catch (error) {
    res.status(500).send({ message: "Errore del server.", error: error });
  }
});

posts.post("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const newComment = new CommentModel({
      comment: req.body.comment,
      rate: req.body.rate,
      postId: id,
      authorId: req.body.authorId,
    });
    const savedComment = await newComment.save();
    res.status(201).send(savedComment);
  } catch (error) {
    res.status(500).send({ message: "Errore del server.", error: error });
  }
});

posts.put("/posts/:id/comment/update/:commentId", async (req, res) => {
  try {
    const { id, commentId } = req.params;
    const updatedComment = await CommentModel.findOneAndUpdate(
      { _id: commentId, postId: id },
      req.body,
      { new: true }
    );
    if (!updatedComment) {
      return res.status(404).send({ message: "Commento non trovato." });
    }
    res.status(200).send(updatedComment);
  } catch (error) {
    res.status(500).send({ message: "Errore del server.", error: error });
  }
});

posts.delete("/posts/:id/comment/:commentId", async (req, res) => {
  try {
    const { id, commentId } = req.params;
    const result = await CommentModel.findOneAndDelete({
      _id: commentId,
      postId: id,
    });
    if (!result) {
      return res.status(404).send({ message: "Commento non trovato." });
    }
    res.status(200).send({ message: "Commento eliminato con successo." });
  } catch (error) {
    res.status(500).send({ message: "Errore del server.", error: error });
  }
});

module.exports = posts;
