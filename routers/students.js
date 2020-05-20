const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const Student = require('../models/Student');

router.get('/students', auth, async (req, res) => {
    const students = await Student.find();
    res.send(students);
});

module.exports = router;
