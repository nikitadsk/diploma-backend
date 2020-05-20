const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const Discipline = require('../models/Discipline');

router.get('/disciplines', auth, async (req, res) => {
    const disciplines = await Discipline.find();
    res.send(disciplines);
});

module.exports = router;
