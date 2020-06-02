const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const auth = require('../middleware/auth');

const Group = require('../models/Group');
const Teacher = require('../models/Teacher');
const Specialty = require('../models/Specialty');
const Student = require('../models/Student');

router.get('/groups', auth, async (req, res) => {
    const groups = await Group.find();
    for (let group of groups) {
        group = await generateProperties(group);
    }
    res.send(groups);
});

router.get('/groups/:groupId', auth, async (req, res) => {
    const group = await Group.findById(req.params.groupId);
    res.send(await generateProperties(group));
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

router.put('/groups/:groupId', auth, async (req, res) => {
    await Group.updateOne({ _id: req.params.groupId }, {
        $set: {
            headmanId: req.body.headmanId,
            disciplineIds: req.body.disciplineIds
        }
    });
    res.send({
       success: {
           title: 'Успех',
           message: 'Информация о группе обновлена'
       }
    })
});

async function generateProperties(group) {
    group._doc.specialtyName = (await Specialty.findById(group.specialtyId)).specialtyName;

    const { firstName, lastName, patronym } = await Teacher.findById(group.curatorId);
    group._doc.curatorName = `${lastName} ${firstName} ${patronym}`;

    if (group.headmanId) {
        const student = await Student.findById(group.headmanId);
        if (student) {
            group._doc.headmanName = `${student.lastName} ${student.firstName} ${student.patronym}`;
        } else {
            group._doc.headmanId = undefined;
            await Group.updateOne({ _id: group._id }, { $set: { headmanId: undefined }});
        }
    }

    return group;
}

module.exports = router;
