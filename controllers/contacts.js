// controllers/contacts.js
const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const getAll = async (req, res, next) => {
  try {
    const db = mongodb.getDatabase();
    const contacts = await db.collection('contacts').find().toArray();
    res.status(200).json(contacts);
  } catch (err) { next(err); }
};

const getSingle = async (req, res, next) => {
  try {
    const id = String(req.params.id || '').trim();
    if (!ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid contact id' });

    const db = mongodb.getDatabase();
    const contact = await db.collection('contacts').findOne({ _id: new ObjectId(id) });
    if (!contact) return res.status(404).json({ message: 'Contact not found' });

    res.status(200).json(contact);
  } catch (err) { next(err); }
};

const createContact = async (req, res, next) => {
  try {
    const db = mongodb.getDatabase(); 
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
    };

    const result = await db.collection('contacts').insertOne(contact);
    res.status(201).json({ _id: result.insertedId, ...contact });
  } catch (err) { next(err); }
};

const updateContact = async (req, res, next) => {
  try {
    const id = String(req.params.id || '').trim();
    if (!ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid contact id' });

    const db = mongodb.getDatabase();
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
    };

    const result = await db.collection('contacts').replaceOne({ _id: new ObjectId(id) }, contact);
    if (result.matchedCount === 0) return res.status(404).json({ message: 'Contact not found' });
    if (result.modifiedCount > 0) return res.status(204).send(); 
    return res.status(200).json({ message: 'No changes detected' });
  } catch (err) { next(err); }
};

const deleteContact = async (req, res, next) => {
  try {
    const id = String(req.params.id || '').trim();
    if (!ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid contact id' });

    const db = mongodb.getDatabase();
    const result = await db.collection('contacts').deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) return res.status(404).json({ message: 'Contact not found' });

    res.status(204).send();
  } catch (err) { next(err); }
};

module.exports = { getAll, getSingle, createContact, updateContact, deleteContact };
