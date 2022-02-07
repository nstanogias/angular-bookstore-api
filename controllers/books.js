const Book = require("../models/book");

exports.createBook = (req, res, next) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    category: req.body.category,
    year: req.body.year,
    price: req.body.price,
    inStock: req.body.inStock,
  });
  book
    .save()
    .then(createdBook => {
      res.status(201).json({
        message: "Book added successfully",
        book: {
          ...createdBook,
          id: createdBook._id
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Creating a book failed!"
      });
    });
};

exports.updateBook = (req, res, next) => {
  const book = new Book({
    _id: req.body._id,
    title: req.body.title,
    author: req.body.author,
    category: req.body.category,
    year: req.body.year,
    price: req.body.price,
    inStock: req.body.inStock
  });
  Book.updateOne({ _id: req.params.id }, book)
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Couldn't udpate book!"
      });
    });
};

exports.getBooks = (req, res, next) => {
  const bookQuery = Book.find();
  let fetchedBooks;
  bookQuery
    .then(documents => {
      fetchedBooks = documents;
      res.status(200).json({
        message: "Books fetched successfully!",
        books: fetchedBooks
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching books failed!"
      });
    });
};

exports.getBook = (req, res, next) => {
  Book.findById(req.params._id)
    .then(book => {
      if (book) {
        res.status(200).json(book);
      } else {
        res.status(404).json({ message: "Book not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching book failed!"
      });
    });
};

exports.deleteBook = (req, res, next) => {
  Book.deleteOne({ _id: req.params.id })
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Deleting book failed!"
      });
    });
};
