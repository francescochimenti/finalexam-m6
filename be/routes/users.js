const express = require("express");
const users = express.Router();
const UserModel = require("../models/users");

users.get("/users", async (req, res) => {
  try {
    const users = await UserModel.find();

    res.status(200).send({
      statusCode: 200,
      users,
    });
  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

users.get("/users/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).send({
        statusCode: 404,
        message: "User not found",
      });
    }
    res.status(200).send({
      statusCode: 200,
      message: "User fetched successfully",
      user,
    });
  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

users.post("/users/create", async (req, res) => {
  const newUser = new UserModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    birthday: req.body.birthday,
    avatar: req.body.avatar,
  });
  try {
    const user = await newUser.save();

    res.status(201).send({
      statusCode: 201,
      message: "User created successfully",
      payload: user,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Error interno del server",
    });
  }
});

users.patch("/users/update/:userId", async (req, res) => {
  const { userId } = req.params;

  const userExist = await UserModel.findById(userId);

  if (!userExist) {
    return res.status(404).send({
      statusCode: 404,
      message: "User not found",
    });
  }

  try {
    const userToUpdate = req.body;
    const options = { new: true };
    const result = await UserModel.findByIdAndUpdate(
      userId,
      userToUpdate,
      options
    );

    res.status(200).send({
      statusCode: 200,
      message: "User updated successfully",
      payload: result,
    });
  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: "Error interno del server",
    });
  }
});

users.delete("/users/delete/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await UserModel.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).send({
        statusCode: 404,
        message: "User not found or already deleted",
      });
    }
    res.status(200).send({
      statusCode: 200,
      message: "User deleted successfully",
    });
  } catch (e) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

module.exports = users;
