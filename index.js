/* Зона импорта библиотек */

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

/*****************************************/

/* Зона импорта рутов */

const usersRoutes = require('./routes/users');
const teachersRoutes = require('./routes/teachers');

/*****************************************/

const app = express();

app.use(bodyParser.json());
app.use(cors());

/* Зона подключения рутов */

app.use('/api', usersRoutes);
app.use('/api', teachersRoutes);

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
