const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const auth = require('../middleware/auth');
const Discipline = require('../models/Discipline');
const Teacher = require('../models/Teacher');

router.get('/disciplines', auth, async (req, res) => {
    const disciplines = await Discipline.find();
    res.send(disciplines);
});

router.get('/disciplines/:disciplineId', auth, async (req, res) => {
    const discipline = await Discipline.findById(req.params.disciplineId);
    res.send(discipline);
});

router.post('/disciplines/by-array-ids', auth, async (req, res) => {
    const disciplines = await Discipline.find({
      '_id': {
          $in: req.body.disciplineIds
      }
    });
    res.send(disciplines);
});

router.post('/disciplines', auth, async (req, res) => {
    const disciplines = new Discipline(req.body);
    disciplines._id = new mongoose.mongo.ObjectId();
    await disciplines.save();
    res.send({
        success: {
            title: 'Успех',
            message: 'Дисциплина добавлена'
        }
    });
});

router.delete('/disciplines/:disciplineId', auth, async (req, res) => {
   await Discipline.deleteOne({
       '_id': {
           $in: req.params.disciplineId
       }
   });

   await Teacher.find({
       'disciplineIds': {
           $in: req.params.disciplineId
       }
   }).updateMany({}, { $pull: { disciplineIds: req.params.disciplineId }});

   res.send({
       success: {
           title: 'Успех',
           message: 'Дисциплина удалена'
       }
   });
});

module.exports = router;
