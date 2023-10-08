const express = require("express"); // Import the Express framework
const authors = express.Router(); // Create a new router instance
const AuthorModel = require("../models/author"); // Import the AuthorModel from the models directory

// Route to fetch all authors
authors.get("/authors", async (request, response) => {
  try {
    const authors = await AuthorModel.find(); // Fetch all authors from the database using the AuthorModel
    response.status(200).send({
      // Send a success response with the fetched authors
      statusCode: 200,
      message: "Authors fetched successfully",
      authors,
    });
  } catch (e) {
    // Catch any errors that occur during the fetch operation
    response.status(500).send({
      // Send an error response with a 500 status code
      statusCode: 500,
      message: "Internal error",
    });
  }
});

// Route to create a new author
authors.post("/authors/create", async (request, response) => {
  const newAuthor = new AuthorModel({
    // Create a new AuthorModel instance with the data from the request body
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    email: request.body.email,
    birthday: request.body.birthday,
    avatar: request.body.avatar,
  });

  try {
    const author = await newAuthor.save(); // Save the new author to the database
    response.status(201).send({
      // Send a success response with the created author
      statusCode: 201,
      message: "Author created successfully",
      author,
    });
  } catch (e) {
    // Catch any errors that occur during the save operation
    response.status(500).send({
      // Send an error response with a 500 status code
      statusCode: 500,
      message: "Internal error",
    });
  }
});

module.exports = authors;
