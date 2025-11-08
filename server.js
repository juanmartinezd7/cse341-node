//server.js
require('dotenv').config();
const express = require('express');
const mongodb = require('./data/database');

const app = express();
app.use(express.json());  
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});              
app.use('/', require('./routes'));       

const port = process.env.PORT || 8080;
mongodb.initDb((err) => {
  if (err) {
    console.error('DB init failed:', err);
    process.exit(1);
  }
  app.listen(port, () => console.log(`Server running on ${port}`));
});

