const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const auth = require('../middleware/auth');
const Skipping = require('../models/Skipping');

router.get('/skippings', auth, async (req, res) => {
    const skippings = await Skipping.find();
    res.send(skippings);
});

router.post('/skippings', auth, async (req, res) => {
    const skippings = new Skipping(req.body);
    skippings._id = new mongoose.mongo.ObjectId();
    await skippings.save();
    res.send({
        success: {
            title: 'Успех',
            message: 'Пропуск добавлен'
        }
    });
});

module.exports = router;
