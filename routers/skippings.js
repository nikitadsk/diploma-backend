const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const auth = require('../middleware/auth');
const Skipping = require('../models/Skipping');
const Schedule = require('../models/Schedule');

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

module.exports = router;
