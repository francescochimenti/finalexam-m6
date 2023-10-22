const express = require("express");
const authors = express.Router();
const AuthorModel = require("../models/author");
const bcrypt = require("bcrypt");

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
    folder: "avatars",
    format: async (req, file) => "png",
    public_id: (req, file) => file.name,
  },
});

const cloudUpload = multer({ storage: cloudStorage });

authors.post(
  "/authors/upload",
  cloudUpload.single("avatar"),
  async (req, res) => {
    try {
      res.status(200).json({
        avatar: req.file.path,
      });
    } catch (e) {
      res.status(500).send({
        statusCode: 500,
        message: "Internal error",
      });
    }
  }
);

authors.get("/authors", async (request, response) => {
  try {
    const authors = await AuthorModel.find();
    response.status(200).send({
      statusCode: 200,
      message: "Authors fetched successfully",
      authors,
    });
  } catch (e) {
    response.status(500).send({
      statusCode: 500,
      message: "Internal error",
    });
  }
});

authors.post("/authors/create", async (request, response) => {
  // complex algorithm to create a new author
  const salt = await bcrypt.genSalt(10);
  // convert the password to a hashed password
  const hashedPassword = await bcrypt.hash(request.body.password, salt);

  const newAuthor = new AuthorModel({
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    password: hashedPassword,
    email: request.body.email,
    birthday: request.body.birthday,
    avatar: request.body.avatar,
  });

  try {
    const author = await newAuthor.save();
    response.status(201).send({
      statusCode: 201,
      message: "Author created successfully",
      author,
    });
  } catch (e) {
    response.status(500).send({
      statusCode: 500,
      message: "Internal error",
    });
  }
});

authors.patch("/authors/update/:id", async (request, response) => {
  try {
    const author = await AuthorModel.findByIdAndUpdate(
      request.params.id,
      request.body,
      {
        new: true,
      }
    );
    response.status(200).send({
      statusCode: 200,
      message: "Author updated successfully",
      author,
    });
  } catch (e) {
    response.status(500).send({
      statusCode: 500,
      message: "Internal error",
    });
  }
});

authors.delete("/authors/delete/:id", async (request, response) => {
  try {
    const author = await AuthorModel.findByIdAndDelete(request.params.id);
    response.status(200).send({
      statusCode: 200,
      message: "Author deleted successfully",
      author,
    });
  } catch (e) {
    response.status(500).send({
      statusCode: 500,
      message: "Internal error",
    });
  }
});

module.exports = authors;
