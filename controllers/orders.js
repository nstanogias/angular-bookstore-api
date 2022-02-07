const Order = require("../models/order");

exports.createOrder = (req, res, next) => {
  let orderedBooks = req.body.cart.lines.map(line => {
    return {
      bookId: line.book._id,
      bookTitle: line.book.title,
      quantity: line.quantity
    }
  });
  const order = new Order({
    books: orderedBooks,
    creator: req.userData.userId,
    shipped: req.body.shipped,
    name: req.body.name,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    country: req.body.country
  });
  order
    .save()
    .then(createdOrder => {
      res.status(201).json({
        message: "Order added successfully",
        order: {
          ...createdOrder,
          id: createdOrder._id
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Creating a order failed!"
      });
    });
};

exports.updateOrder = (req, res, next) => {
  const order = new Order({
    _id: req.body._id,
    books: req.body.books,
    creator: req.body.creator,
    shipped: req.body.shipped,
    name: req.body.name,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    country: req.body.country
  });
  Order.updateOne({ _id: req.params.id }, order)
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Couldn't udpate order!"
      });
    });
};

exports.getOrders = (req, res, next) => {
  const orderQuery = Order.find();
  let fetchedOrders;
  orderQuery
    .then(documents => {
      fetchedOrders = documents;
      res.status(200).json({
        message: "Orders fetched successfully!",
        orders: fetchedOrders
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching orders failed!"
      });
    });
};

exports.getOrder = (req, res, next) => {
  Order.findById(req.params.id)
    .then(order => {
      if (order) {
        res.status(200).json(order);
      } else {
        res.status(404).json({ message: "Order not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching order failed!"
      });
    });
};

exports.deleteOrder = (req, res, next) => {
  Order.deleteOne({ _id: req.params.id})
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Deleting order failed!"
      });
    });
};
