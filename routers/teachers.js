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

router.get('/teachers/available/as-new-curator', auth, async (req, res) => {
   const teachers = await Teacher.find({ isCurator: false });
   for (const teacher of teachers) {
       teacher._doc.name = `${teacher.lastName} ${teacher.firstName} ${teacher.patronym}`;
   }
   res.send(teachers);
});

router.get('/teachers/by-discipline-id/:disciplineId', auth, async (req, res) => {
    const teachers = await Teacher.find({
        disciplineIds: {
            $in: mongoose.Types.ObjectId(req.params.disciplineId)
        }
    });

    for (const teacher of teachers) {
        teacher._doc.name = `${teacher.lastName} ${teacher.firstName} ${teacher.patronym}`;
    }
    res.send(teachers);
});

router.post('/teachers', auth, async (req, res) => {
    const teacher = new Teacher(req.body);
    teacher._id = new mongoose.mongo.ObjectId();
    teacher.isCurator = false;
    await teacher.save();
    res.send({
        success: {
            title: 'Успех',
            message: 'Преподаватель добавлен'
        }
    });
});

module.exports = router;
