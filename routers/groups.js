const express = require('express');
const mongoose = require('mongoose');
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

router.get('/groups/by-curator-id/:curatorId', auth, async (req, res) => {
    const group = await Group.findOne({
        curatorId: req.params.curatorId
    });
    group._doc.specialtyName = (await Specialty.findById(group.specialtyId)).specialtyName;
    res.send(group);
});

router.post('/groups', auth, async (req, res) => {
    const group = new Group(req.body);
    group._id = new mongoose.mongo.ObjectId();
    await group.save();
    await Teacher.updateOne({
        _id: req.body.curatorId
    }, {
        $set: {
            isCurator: true
        }
    });

    res.send({
        success: {
            title: 'Успех',
            message: 'Группа создана'
        }
    });
});

module.exports = router;
