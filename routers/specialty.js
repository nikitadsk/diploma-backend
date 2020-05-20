const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const Specialty = require('../models/Specialty');

router.get('/specialty', auth, async (req, res) => {
    const specialty = await Specialty.find();
    res.send(specialty);
});

module.exports = router;
