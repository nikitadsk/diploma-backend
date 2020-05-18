/* Зона импорта библиотек */

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

/*****************************************/

/* Зона импорта рутов */

const authRouters = require('./routers/auth');
const usersRouters = require('./routers/users');
const teachersRouters = require('./routers/teachers');

/*****************************************/

const app = express();

app.use(bodyParser.json());
app.use(cors());

/* Зона подключения роутеров */

app.use('/api', authRouters);
app.use('/api', usersRouters);
app.use('/api', teachersRouters);

/*****************************************/

mongoose
    .connect('mongodb://45.143.93.123:27017/vgpk_database', {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    .then(() => {
        app.listen(4000, () => {
            console.log('СЕРВЕР ЗАПУЩЕН НА ПОРТУ 4000')
        })
    });
