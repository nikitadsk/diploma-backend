const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_KEY = require('../utils/consts').JWT_TOKEN;

const auth = async(req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    try {
        const data = jwt.verify(token, JWT_KEY);
        const user = await User.findOne( {
           _id: data._id,
           token
        });

        if (!user) {
            res.status(401).send({
                error: 'Нет доступа к ресурсу'
            });
        }

        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        res.status(401).send({
            error: 'Нет доступа к ресурсу'
        });
    }
}

module.exports = auth;
