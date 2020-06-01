const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const auth = require('../middleware/auth');
const Student = require('../models/Student');

router.get('/students/by-group-id/:groupId', auth, async (req, res) => {
    const students = await Student.find({ groupId: req.params.groupId });
    res.send(students);
});

router.post('/students', auth, async (req, res) => {
    const student = new Student(req.body);
    student._id = new mongoose.mongo.ObjectId();
    await student.save();
    res.send({
        success: {
            title: 'Успех',
            message: 'Студент добавлен'
        }
    });
});

module.exports = router;
