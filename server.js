// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// MongoDB
mongoose.connect('mongodb://localhost:27017/rest_test', {useNewUrlParser: true});

// Express
const app = express();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// Routes
app.use('/api', require('./routes/api'));
app.use('/auth', require('./routes/auth'));

// Start Server
app.listen(8000, () => {
    console.log('Example app listening on port 8000!')
    });