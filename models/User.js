const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId;

const schema = mongoose.Schema({
    _id: ObjectId,
    login: String,
    password: String,
    firstName: String,
    lastName: String,
    editedGroup: Number | ObjectId,
    scheduleManagement: Boolean,
    teachersManagement: Boolean,
    groupsManagement: Boolean,
    studentsManagement: Boolean,
    skippingsManagement: Boolean,
});

module.exports = mongoose.model('User', schema);
