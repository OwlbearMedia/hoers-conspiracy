require('dotenv').config();
const path = require('path');
const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');
const mongoose = require('mongoose');
const service = require('feathers-mongoose');
const User = require('./UserModel');
const Board = require('./ConspiracyBoardModel');

mongoose.Promise = global.Promise;

// Connect to your MongoDB instance(s)
mongoose.connect(process.env.MONGODB_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// Create an Express compatible Feathers application instance.
const app = express(feathers());
// Serve the app
app.use('/', express.static(path.join(__dirname, '../dist')));
// Turn on JSON parser for REST services
app.use('/api', express.json());
// Turn on URL-encoded parser for REST services
app.use('/api', express.urlencoded({ extended: true }));
// Enable REST services
app.configure(express.rest());
// Handle errors
app.use(express.errorHandler());

// Enable Socket.io services
app.configure(socketio((io) => {
  io.on('connection', (socket) => {
    socket.on('moveNode', (data) => {
      socket.broadcast.emit('nodeMoved', data);
    });
    socket.on('moveChildNode', (data) => {
      socket.broadcast.emit('childNodeMoved', data);
    });
  });
}));

// API
// Connect to the db, create and register a Feathers service.
app.use('/api/users', service({
  Model: User,
  lean: true,
}));

app.use('/api/boards', service({
  Model: Board,
  lean: true,
}));

// const backup = require('./bak.json');
// app.service('api/boards').update('5f1235757625c1f0d3215889', backup)
//   .then((board) => {
//     console.log('Created board', board);
//   }).catch((err) => {
//     console.log(err);
//   });

// Start the server.
const port = 1917;
app.listen(process.env.PORT || port, () => {
  console.log(`Feathers server listening on port ${port}`);
});
