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
            lesson = await createPropertiesForLesson(lesson);
        }
    }

    res.send(schedules);
});

router.get('/schedules/by-group-id/:groupId', auth, async (req, res) => {
    try {
        const schedules = await Schedule.find({ groupId: req.params.groupId });

        if (schedules) {
            for (const schedule of schedules) {
                for (let lesson of schedule.lessons) {
                    lesson = await createPropertiesForLesson(lesson);
                }
            }
        }
        res.send(schedules);
    } catch {
        res.status(400).send({
            title: 'Ошибка запроса',
            message: 'Во время запроса произошла ошибка'
        });
    }
});

router.get('/schedules/by-teacher-id/:teacherId', auth, async (req, res) => {
    try {
        const schedules = await Schedule.find({
            lessons: {
                $elemMatch: { teacherId: req.params.teacherId }
            }
        });

        if (schedules) {
            for (const schedule of schedules) {
                for (let lesson of schedule.lessons) {
                    lesson = await createPropertiesForLesson(lesson);
                }
            }
        }
        res.send(schedules);
    } catch {
        res.status(400).send({
            title: 'Ошибка запроса',
            message: 'Во время запроса произошла ошибка'
        });
    }
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

async function createPropertiesForLesson(lesson) {
    const { lastName, firstName, patronym } = await Teacher.findById(lesson.teacherId);
    const { disciplineName } = await Discipline.findById(lesson.disciplineId);

    lesson._doc.teacherName = `${lastName} ${firstName} ${patronym}`;
    lesson._doc.disciplineName = disciplineName;

    return lesson;
}

module.exports = router;
