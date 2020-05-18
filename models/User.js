const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const JWT_KEY = require('../utils/consts').JWT_TOKEN;

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
    token: {
        type: String,
        required: true
    }
});

schema.methods.generateAuthToken = async function() {
    const token = jwt.sign({
        _id: this._id
    }, JWT_KEY);
    this.token = token;
    await this.save();
    return token;
}

schema.statics.findByCredentials = async (login, password) => {
    const user = await User.findOne({ login });

    if (!user) {
        throw new Error('Неверный логин');
    }

    const isPasswordMatch = password === user.password;

    if (!isPasswordMatch) {
        throw new Error('Неверный пароль');
    }

    return user;
}

const User = mongoose.model('User', schema);

module.exports = User;
