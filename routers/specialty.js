const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const auth = require('../middleware/auth');
const Specialty = require('../models/Specialty');

router.get('/specialty', auth, async (req, res) => {
    const specialty = await Specialty.find();
    res.send(specialty);
});

router.post('/specialty', auth, async (req, res) => {
    const specialty = new Specialty(req.body);
    specialty._id = new mongoose.mongo.ObjectId();
    await specialty.save();
    res.send({
        success: {
            title: 'Успех',
            message: 'Специальность добавлена'
        }
    });
});

module.exports = router;
