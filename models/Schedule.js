const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId;

const schema = mongoose.Schema({
    _id: ObjectId,
    date: Date,
    groupId: ObjectId,
    lessons: [{
        teacherId: ObjectId,
        disciplineId: ObjectId
    }],
    isVerified: Boolean,
    isMarked: Boolean,
    skippings: [Object],
    skippingsForStudents: Object
});

module.exports = mongoose.model('Schedule', schema);
