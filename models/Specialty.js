const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    specialtyCode: String,
    specialtyName: String
}, { collection: 'specialty' });

module.exports = mongoose.model('Specialty', schema);
