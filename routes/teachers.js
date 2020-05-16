const express = require('express');
const router = express.Router();

const Teacher = require('../models/Teacher');

router.get('/teachers', async (req, res) => {
    const users = await Teacher.find();
    res.send(users);
});

module.exports = router;
