const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    specialtyName: String,
    specialtyCode: String
});

module.exports = mongoose.model('Specialty', schema);
