const express = require("express");
const login = express.Router();
const bcrypt = require("bcrypt");
const AuthorModel = require("../models/author");
const jwt = require("jsonwebtoken");
require("dotenv").config();

login.post("/login", async (request, response) => {
  const author = await AuthorModel.findOne({ email: request.body.email });

  if (!author) {
    return response.status(404).send({
      message: "Current author doesn't exist",
      statusCode: 404,
    });
  }

  const validPassword = await bcrypt.compare(
    request.body.password,
    author.password
  );

  if (!validPassword) {
    return response.status(400).send({
      statusCode: 400,
      message: "Incorrect email or password",
    });
  }

  //token creation
  const token = jwt.sign(
    {
      id: author._id,
      firstName: author.firstName,
      lastName: author.lastName,
      email: author.email,
      birthday: author.birthday,
      avatar: author.avatar,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "24h",
    }
  );

  response.header("Authorization", token).status(200).send({
    statusCode: 200,
    message: "Login successful",
    token,
  });
});

module.exports = login;
