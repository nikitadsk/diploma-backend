const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const Teacher = require('../models/Teacher');

router.get('/teachers', auth, async (req, res) => {
    const teachers = await Teacher.find();
    res.send(teachers);
});

module.exports = router;
