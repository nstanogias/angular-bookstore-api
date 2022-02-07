const express = require("express");

const BookController = require("../controllers/books");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("", checkAuth, BookController.createBook);

router.put("/:id", checkAuth, BookController.updateBook);

router.get("", BookController.getBooks);

router.get("/:id", BookController.getBook);

router.delete("/:id", checkAuth, BookController.deleteBook);

module.exports = router;
