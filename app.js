const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const booksRoutes = require('./routes/books');
const userRoutes = require('./routes/user');
const ordersRoutes = require('./routes/orders');

const app = express();

console.log(process.env.MONGO_URI);

mongoose
  .connect(process.env.MONGO_URI, { useUnifiedTopology: true, useCreateIndex: true, useNewUrlParser: true })
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(() => {
    console.log('Connection failed!');
  });

app.use('/api/books', booksRoutes);
app.use('/api/user', userRoutes);
app.use('/api/orders', ordersRoutes);

module.exports = app;
