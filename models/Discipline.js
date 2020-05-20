const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    disciplineName: String,
});

module.exports = mongoose.model('Discipline', schema);
