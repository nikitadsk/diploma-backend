const express = require('express');
const router = express.Router();

const User = require('../models/User');

router.post('/login', async (req, res) => {
    try {
        const { login, password } = req.body;

        const user = await User.findByCredentials(login, password);

        if (!user) {
            return res.status(401).send('Ошибка авторизации');
        }

        const token = await user.generateAuthToken();

        user.login = undefined;
        user.password = undefined;

        res.send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
