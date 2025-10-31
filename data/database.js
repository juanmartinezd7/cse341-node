//data/database
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

  const uri = process.env.MONGODB_URI || process.env.MONGODB_URL; // support either name
  const dbName = process.env.DB_NAME;

  if (!uri) return callback(new Error('Missing MONGODB_URI (or MONGODB_URL)'));
  if (!dbName) return callback(new Error('Missing DB_NAME'));

  client = new MongoClient(uri);

  client.connect()
    .then(() => {
      database = client.db(dbName);           // ✅ assign the db!
      return database.command({ ping: 1 });   // optional sanity check
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
