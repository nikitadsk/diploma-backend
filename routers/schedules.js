const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const auth = require('../middleware/auth');
const Schedule = require('../models/Schedule');
const Teacher = require('../models/Teacher');
const Discipline = require('../models/Discipline');

router.get('/schedules', auth, async (req, res) => {
    const schedules = await Schedule.find();

    for (const schedule of schedules) {
        for (let lesson of schedule.lessons) {
            const { lastName, firstName, patronym } = await Teacher.findById(lesson.teacherId);
            const { disciplineName } = await Discipline.findById(lesson.disciplineId);

            lesson._doc.teacherName = `${lastName} ${firstName} ${patronym}`;
            lesson._doc.disciplineName = disciplineName;

            console.log(lesson);
        }
    }

    res.send(schedules);
});

router.post('/schedules', auth, async (req, res) => {
    const schedules = new Schedule(req.body);
    schedules._id = new mongoose.mongo.ObjectId();
    await schedules.save();
    res.send({
        success: {
            title: 'Успех',
            message: 'Запись в расписание добавлена'
        }
    });
});

module.exports = router;
