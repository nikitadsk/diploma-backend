const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const auth = require('../middleware/auth');
const Teacher = require('../models/Teacher');

router.get('/teachers', auth, async (req, res) => {
    const teachers = await Teacher.find();
    res.send(teachers);
});

router.get('/teachers/:teacherId', auth, async (req, res) => {
   const teacher = await Teacher.findById(req.params.teacherId);
   res.send(teacher);
});

router.get('/teachers/by-discipline-id/:disciplineId', auth, async (req, res) => {
    const teachers = await Teacher.find({
        disciplineIds: {
            $in: mongoose.Types.ObjectId(req.params.disciplineId)
        }
    });
    res.send(teachers);
});

router.post('/teachers/', auth, async (req, res) => {
    const teacher = new Teacher(req.body);
    teacher._id = new mongoose.mongo.ObjectId();
    await teacher.save();
    res.sendStatus(200).send();
});

module.exports = router;
