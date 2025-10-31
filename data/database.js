// data/database.js
const dotenv = require('dotenv');
dotenv.config();
const { MongoClient } = require('mongodb');

let database;
let client;

const initDb = (callback) => {
  if (database) {
    console.log('Db is already initialized!');
    return callback(null, database);
  }

  // Support either env var name
  const uri = process.env.MONGODB_URI || process.env.MONGODB_URL;

  if (!uri) return callback(new Error('Missing MONGODB_URI (or MONGODB_URL)'));

  client = new MongoClient(uri);

  client.connect()
    .then(() => {
      // ✅ If the URI includes the DB name, just call client.db() with no args
      database = client.db();
      return database.command({ ping: 1 });  // optional sanity check
    })
    .then(() => {
      console.log('✅ MongoDB connected to DB:', database.databaseName);
      callback(null, database);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDatabase = () => {
  if (!database) {
    throw new Error('Database not initialized');
  }
  return database;
};

const closeDb = async () => {
  if (client) await client.close();
  client = undefined;
  database = undefined;
};

module.exports = { initDb, getDatabase, closeDb };
