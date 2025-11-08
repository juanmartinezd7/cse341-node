//routes/contacts
const router = require('express').Router();
const {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact,
} = require('../controllers/contacts');

router.get('/', getAll);
router.get('/:id', getSingle);
router.post('/', createContact);     
router.put('/:id', updateContact);   
router.delete('/:id', deleteContact); 

module.exports = router;
