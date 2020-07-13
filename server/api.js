
const MongoClient = require('mongodb').MongoClient;

// Connection URL
// @todo: move username and password to config file
const url = 'mongodb://heroku_8nl1fq6c:3i2nfdj7fia9oqk7gdp2kgfuc2@ds131814.mlab.com:31814/heroku_8nl1fq6c';

// Create a new MongoClient
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Use connect method to connect to the Server
client.connect(function(err, client) {
  console.log("Connected successfully to server");
  
  const db = client.db();
  const collection = db.collection('boards');
  collection.find().toArray((error, items) => {
    console.log(`collectionName: ${collection.collectionName}`);
    
    if (error) {
      console.log('error', error);
    } else {
      console.log('items', items);
    }

    client.close();
  });
});
