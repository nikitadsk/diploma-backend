const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId;

const schema = mongoose.Schema({
    _id: ObjectId,
    firstName: String,
    lastName: String,
    patronym: String,
    disciplineIds: [ObjectId]
});

module.exports = mongoose.model('Teacher', schema);
