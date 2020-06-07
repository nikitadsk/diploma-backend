const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    scheduleId: mongoose.Types.ObjectId,
    skippings: [{
        id: Number,
        disrespectfulSkippings: [mongoose.Types.ObjectId],
        respectfulSkippings: [mongoose.Types.ObjectId],
    }]
});

module.exports = mongoose.model('Skipping', schema);
