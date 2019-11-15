require('./config/config');

const express = require('express');
const mongoose = require('mongoose');

const app = express();

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Global configuration for routes
app.use(require('./routes'));

mongoose.connect(
  process.env.URLDB, {
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true
  },
   (err, res) => {
  if (err) throw err;
  console.log('DB Online');
});

app.listen(process.env.PORT, () => {
  console.log('Running API... Port: ', 3000)
});