//create express app
const express = require("express");
const app = express();
const path = require("path");

//connect angular app with server
app.use(express.static(path.join(__dirname, "../client/dist/lms/browser")));
//configure environment variables
require("dotenv").config();
//add body parsing middleware
app.use(express.json());

//import api
const userApp = require("./APIs/user-api");
const booksApp = require("./APIs/books-api");

//forward req to userApp when path starts with '/user-api'
app.use("/user-api", userApp);
//forward req to booksApp when path starts with '/books-api'
app.use("/books-api", booksApp);

//error handler
app.use((err, req, res, next) => {
  res.send({ message: "Error occurred", payload: err.message });
});

//assign port number
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`web server listening on port ${PORT}.`));
