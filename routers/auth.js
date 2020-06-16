const express = require('express');
const router = express.Router();

const User = require('../models/User');

router.post('/login', async (req, res) => {
    try {
        const { login, password } = req.body;

        const user = await User.findByCredentials(login, password);
        if (!user) {
            return res.status(401).send({
                title: 'Ошибка авторизации',
                message: 'Неверный логин или пароль'
            });
        }

        const token = await user.generateAuthToken();

        user.login = undefined;
        user.password = undefined;

        res.send({
            user,
            token,
            success: {
                title: 'Успех',
                message: 'Успешная авторизация'
            }
        });
    } catch (error) {
        res.status(400).send({
            title: 'Ошибка авторизации',
            message: 'Неверный логин или пароль'
        });
    }
});

router.post('/check-token', async (req, res) => {
    const user = await User.findOne({ token: req.body.token });

    if (!user) {
        return res.status(401).send({
            title: 'Ошибка авторизации',
            message: 'Токен недействителен'
        });
    }

    user.login = undefined;
    user.password = undefined;

    res.send({
        user,
    });
});

module.exports = router;
