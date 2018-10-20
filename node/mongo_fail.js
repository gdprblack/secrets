
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://mongo:27017';
const dbName = 'admin';

MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  const collection = db.collection('users');
  collection.insertMany([
    {'id' : 1,
      'name': 'enric',
      'age': 24},
    {'id' : 2,
      'name': 'juanjo',
      'age': 22},
    {'id' : 3,
      'name': 'sergi',
      'age': 22}
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Insert 3 users");
    callback(result);
  });

  client.close();
});
