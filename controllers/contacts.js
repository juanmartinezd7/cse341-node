// controllers/contacts.js
const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const getAll = async (req, res, next) => {
  try {
    // getDatabase() already returns a Db instance
    const db = mongodb.getDatabase();
    const contacts = await db.collection('contacts').find().toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
  } catch (err) {
    next(err);
  }
};

const getSingle = async (req, res, next) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const db = mongodb.getDatabase();
    const contact = await db.collection('contacts').findOne({ _id: contactId });

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contact);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAll,
  getSingle,
};

