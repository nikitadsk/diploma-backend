const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const auth = require('../middleware/auth');
const Skipping = require('../models/Skipping');
const Schedule = require('../models/Schedule');
const Student = require('../models/Student');

router.get('/skippings', auth, async (req, res) => {
    const skippings = await Skipping.find();
    res.send(skippings);
});

router.get('/skippings/by-schedule-id/:scheduleId', auth, async (req, res) => {
    const skipping = await Skipping.findOne({ scheduleId: req.params.scheduleId});
    res.send(skipping);
});

router.get('/skippings/verification/:scheduleId', auth, async (req, res) => {
    await Schedule.updateOne({ _id: req.params.scheduleId }, {
        $set: {
            isVerified: true
        }
    });
    res.send({
        success: {
            title: 'Успех',
            message: 'Пропуск отмечен'
        }
    });
});

router.post('/skippings', auth, async (req, res) => {
    const skipping = new Skipping(req.body);
    skipping._id = new mongoose.mongo.ObjectId();
    await Schedule.updateOne({ _id: skipping.scheduleId }, {
        $set: {
            isMarked: true
        }
    });

    await skipping.save();
    res.send({
        success: {
            title: 'Успех',
            message: 'Пропуск добавлен'
        }
    });
});

router.post('/skippings/by-group-and-dates', auth, async (req, res) => {
    const { startDate, endDate, groupId } = req.body;
    const schedules = await Schedule.find({
        date: {
            $gte: startDate,
            $lte: endDate,
        },
        groupId,
        isVerified: true
    });

    const students = await Student.find({ groupId });
    console.log(students);

    const schedulesIds = schedules.map(schedule => schedule._id);
    const skippings = await Skipping.find({
        scheduleId: {
            $in: schedulesIds
        }
    })

    schedules.forEach(schedule => {
        const localSkippings = skippings.find(skipping => skipping.scheduleId.toString() === schedule._id.toString()).skippings;
        schedule.skippings = localSkippings;

        const obj = {};

        students.forEach(({ firstName, lastName, patronym }) => {
            const studentName = `${lastName} ${firstName} ${patronym}`
            obj[studentName] = {
                respectfulSkippingsCount: 0,
                disrespectfulSkippingsCount: 0
            }
        });

        localSkippings.forEach(skipping => {
            skipping.respectfulSkippings.forEach(respectfulSkipping => {
                const { firstName, lastName, patronym } = students.find(student => student._id.toString() === respectfulSkipping.toString());
                const studentName = `${lastName} ${firstName} ${patronym}`
                obj[studentName].respectfulSkippingsCount++;
            });

            skipping.disrespectfulSkippings.forEach(disrespectfulSkipping => {
                const { firstName, lastName, patronym } = students.find(student => student._id.toString() === disrespectfulSkipping.toString());
                const studentName = `${lastName} ${firstName} ${patronym}`
                obj[studentName].disrespectfulSkippingsCount++;
            });
        });

        schedule.skippingsForStudents = obj;
    });
    res.send(schedules);
});

module.exports = router;
