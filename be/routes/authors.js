const express = require("express");
const authors = express.Router();
const AuthorModel = require("../models/author");
const bcrypt = require("bcrypt");

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

module.exports = authors;
