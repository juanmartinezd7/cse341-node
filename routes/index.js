//routes/index.js
const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {res.send('Contacts Page');});


router.use('/contacts', require('./contacts'));

module.exports = router;