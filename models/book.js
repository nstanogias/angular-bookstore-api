const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  year: { type: Number, required: true },
  price: { type: Number, required: true },
  inStock: { type: Number, required: true },
});

module.exports = mongoose.model("Book", bookSchema);
