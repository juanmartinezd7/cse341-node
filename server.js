//server.js
require('dotenv').config();             // optional: also load here
const express = require('express');
const mongodb = require('./data/database');

const app = express();
const port = process.env.PORT || 8080;

// Mount routes before or after initDb—either works since we only start listening after init
app.use(express.json());
app.use('/', require('./routes'));

mongodb.initDb((err) => {
  if (err) {
    console.error('❌ DB init failed:', err);
    process.exit(1);
  }
  app.listen(port, () => {
    console.log(`Database is listening and node Running on port ${port}`);
  });
});

