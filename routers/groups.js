const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const Group = require('../models/Group');
const Teacher = require('../models/Teacher');
const Specialty = require('../models/Specialty');

router.get('/groups', auth, async (req, res) => {
    const groups = await Group.find();
    for (const group of groups) {
        group._doc.specialtyName = (await Specialty.findById(group.specialtyId)).specialtyName;
        const { firstName, lastName, patronym } = await Teacher.findById(group.curatorId);
        group._doc.curatorName = `${lastName} ${firstName} ${patronym}`;
    }
    res.send(groups);
});

module.exports = router;
