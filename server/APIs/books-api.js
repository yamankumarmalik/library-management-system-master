//create a Route(mini express app)
const express = require("express");
const booksApp = express.Router();

//get express-async-handler to handle async errors
const expressAsyncHandler = require("express-async-handler");
const verifyToken = require("../Middlewares/verifyToken");

//to user middlware for every request of booksApp
// booksApp.use(verifyToken);

//import req handlers from Controller
const {
  getBooks,
  deleteBook,
  addNewBook,
  updateBook,
  showBook,
} = require("../Controllers/books-controller");

//books CRUD

//add New Book
booksApp.post("/add-new-book", expressAsyncHandler(addNewBook));

//get all books
booksApp.get("/all-books", expressAsyncHandler(getBooks));

//delete book
booksApp.delete("/delete-book/:userId", expressAsyncHandler(deleteBook));

//update book
booksApp.put("/update-book", expressAsyncHandler(updateBook));

//show book
booksApp.get("/show-book/:userId", expressAsyncHandler(showBook));

module.exports = booksApp;
