const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId;

const schema = mongoose.Schema({
    _id: ObjectId,
    groupNumber: Number,
    specialtyId: ObjectId,
    curatorId: ObjectId,
    headmanId: ObjectId,
    disciplineIds: [ObjectId]
});

module.exports = mongoose.model('Group', schema);
