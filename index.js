const path = require('path');
const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
// const socketio = require('@feathersjs/socketio');
const mongoose = require('mongoose');
const service = require('feathers-mongoose');
const User = require('./server/UserModel');
const Board = require('./server/ConspiracyBoardModel');

mongoose.Promise = global.Promise;

// Connection URL
// @todo: move username and password to config file
const url = 'mongodb://heroku_8nl1fq6c:3i2nfdj7fia9oqk7gdp2kgfuc2@ds131814.mlab.com:31814/heroku_8nl1fq6c';

// Connect to your MongoDB instance(s)
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create an Express compatible Feathers application instance.
const app = express(feathers());
// Serve the app
app.use('/', express.static(path.join(__dirname, './dist')));
// Turn on JSON parser for REST services
app.use('/api', express.json());
// Turn on URL-encoded parser for REST services
app.use('/api', express.urlencoded({ extended: true }));
// Enable REST services
app.configure(express.rest());
// Enable Socket.io services
// app.configure(socketio());
// Handle errors
app.use(express.errorHandler());

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

// app.service('api/boards').update('5f1235757625c1f0d3215889', {
//   "conspirators":[

//   ],
//   "nodes":[
//      {
//         "children":[
//            "5f1235757625c1f0d3215891"
//         ],
//         "_id":"5f12376c4556d6f1a6128914",
//         "top":56,
//         "left":367,
//         "type":"map",
//         "content":"map-europe-5"
//      },
//      {
//         "children":[

//         ],
//         "_id":"5f1235757625c1f0d321588a",
//         "top":45,
//         "left":47,
//         "type":"note",
//         "title":"This is a clue",
//         "content":{
//            "notes":"Yep, another connection"
//         }
//      },
//      {
//         "children":[

//         ],
//         "_id":"5f1235757625c1f0d321588b",
//         "top":142,
//         "left":165,
//         "type":"note",
//         "title":"This is a related clue",
//         "content":{
//            "notes":"Yep, another connection"
//         }
//      },
//      {
//         "children":[

//         ],
//         "_id":"5f1235757625c1f0d321588c",
//         "top":315,
//         "left":30,
//         "type":"note",
//         "title":"Yep, another connection",
//         "content":{
//            "notes":"Yep, another connection"
//         }
//      },
//      {
//         "children":[

//         ],
//         "_id":"5f1235757625c1f0d321588d",
//         "top":23,
//         "left":584,
//         "type":"note",
//         "title":"This is a clue unrelated to the others",
//         "content":{
//            "notes":"Nope, no connection"
//         }
//      },
//      {
//         "children":[

//         ],
//         "_id":"5f1235757625c1f0d321588e",
//         "top":662,
//         "left":210,
//         "type":"note",
//         "title":"I think this dude might be a vampire",
//         "content":{
//            "notes":"For real, ya’ll"
//         }
//      },
//      {
//         "children":[

//         ],
//         "_id":"5f1235757625c1f0d321588f",
//         "top":703,
//         "left":453,
//         "type":"document",
//         "title":"Could this be related???",
//         "image":"newspaper.jpg"
//      },
//      {
//         "children":[

//         ],
//         "_id":"5f1235757625c1f0d3215890",
//         "top":594,
//         "left":52,
//         "type":"person",
//         "title":"Vlad III",
//         "content":{
//            "id":"25101917",
//            "name":"Vlad III",
//            "aliases":"Vlad the Impaler, Vlad Dracula",
//            "dob":"Unknown, sometime between 1428 and 1431",
//            "birthplace":"Sighișoara, Transylvania, Kingdom of Hungary",
//            "occupation":"Voivode of Wallachia",
//            "status":"Allegedly died in battle then hacked to pieces in 1476",
//            "notes":"Vlad III is known as Vlad Țepeș (or Vlad the Impaler) in Romanian historiography. This sobriquet is connected to the impalement that was his favorite method of execution. The Ottoman writer Tursun Beg referred to him as Kazıklı Voyvoda (Impaler Lord) around 1500. Mircea the Shepherd, Voivode of Wallachia, used this sobriquet when referring to Vlad III in a letter of grant on 1 April 1551. Vlad’s reputation for cruelty and his patronymic inspired the name of the vampire Count Dracula.",
//            "description":"Pope Pius II’s legate, Niccolò Modrussa, painted the only extant description of Vlad, whom he had met in Budapest. A copy of Vlad’s portrait has been featured in the \"monster portrait gallery\" in the Ambras Castle at Innsbruck. The picture depicts \"a strong, cruel, and somehow tortured man\" with \"large, deep-set, dark green, and penetrating eyes\", according to Florescu. The color of Vlad’s hair cannot be determined, because Modrussa mentions that Vlad was black-haired, while the portrait seems to show that he had fair hair. The picture depicts Vlad with a large lower lip."
//         },
//         "image":"Vlad-III.jpg"
//      },
//      {
//         "children":[

//         ],
//         "_id":"5f1235757625c1f0d3215891",
//         "top":513,
//         "left":827,
//         "isChild":true,
//         "localTop":458,
//         "localLeft":456,
//         "type":"pin",
//         "title":"",
//         "content":{
//            "location":"Rumania"
//         }
//      }
//   ],
//   "links":[
//     {
//       pointA: '5f1235757625c1f0d321588a',
//       pointB: '5f1235757625c1f0d321588b',
//       description: '',
//     },
//     {
//       pointA: '5f1235757625c1f0d321588b',
//       pointB: '5f1235757625c1f0d321588c',
//       description: '',
//     },
//     {
//       pointA: '5f1235757625c1f0d3215891',
//       pointB: '5f1235757625c1f0d3215890',
//       description: '',
//     },
//     {
//       pointA: '5f1235757625c1f0d3215891',
//       pointB: '5f1235757625c1f0d321588b',
//       description: '',
//     },
//     {
//       pointA: '5f1235757625c1f0d3215891',
//       pointB: '5f1235757625c1f0d321588f',
//       description: '',
//     },
//   ],
//   "__v":0
// }).then(function(board) {
//   console.log('Created board', board);
// }).catch((err) => {
//   console.log(err)
// });

// Start the server.
const port = 1917;
app.listen(process.env.PORT || port, () => {
  console.log(`Feathers server listening on port ${port}`);
});
