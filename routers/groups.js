const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const Group = require('../models/Group');

router.get('/groups', auth, async (req, res) => {
    const groups = await Group.find();
    res.send(groups);
});

module.exports = router;
