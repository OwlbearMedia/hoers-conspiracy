const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');
const mongoose = require('mongoose');
const service = require('feathers-mongoose');
const User = require('./UserModel');

mongoose.Promise = global.Promise;

// Connection URL
// @todo: move username and password to config file
const url = 'mongodb://heroku_8nl1fq6c:3i2nfdj7fia9oqk7gdp2kgfuc2@ds131814.mlab.com:31814/heroku_8nl1fq6c';

// Connect to your MongoDB instance(s)
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Create an Express compatible Feathers application instance.
const app = express(feathers());

// Turn on JSON parser for REST services
app.use(express.json());
// Turn on URL-encoded parser for REST services
app.use(express.urlencoded({ extended: true }));
// Enable REST services
app.configure(express.rest());
// Enable Socket.io services
app.configure(socketio());
// Connect to the db, create and register a Feathers service.
app.use('api/users', service({
  Model: User,
  lean: true, // set to false if you want Mongoose documents returned
}));
app.use(express.errorHandler());

// Create a dummy Message
// app.service('api/users').create({
//   email: 'thedylanwhitney2@gmail.com',
//   password: 'wait,this.is.encrypted.right?',
//   name: 'Hoers'
// }).then(function(user) {
//   console.log('Created user', user);
// }).catch((err) => {
//   console.log()
// });

// Start the server.
const port = 3030;
app.listen(port, () => {
  console.log(`Feathers server listening on port ${port}`);
});
