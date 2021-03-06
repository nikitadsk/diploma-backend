/* Зона импорта библиотек */

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config()

const CONNECTION_STRING = process.env.CONNECTION_STRING;

/*****************************************/

/* Зона импорта рутов */

const authRouters = require('./routers/auth');
const usersRouters = require('./routers/users');
const teachersRouters = require('./routers/teachers');
const disciplinesRouters = require('./routers/disciplines');
const groupsRouters = require('./routers/groups');
const specialtyRouters = require('./routers/specialty');
const studentsRouters = require('./routers/students');
const schedulesRouters = require('./routers/schedules');
const skippingsRouters = require('./routers/skippings');

/*****************************************/

const app = express();

app.use(bodyParser.json());
app.use(cors());

/* Зона подключения роутеров */

app.use('/api', authRouters);
app.use('/api', usersRouters);
app.use('/api', teachersRouters);
app.use('/api', disciplinesRouters);
app.use('/api', groupsRouters);
app.use('/api', specialtyRouters);
app.use('/api', studentsRouters);
app.use('/api', schedulesRouters);
app.use('/api', skippingsRouters);

/*****************************************/

mongoose
    .connect(CONNECTION_STRING, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    .then(() => {
        app.listen(4000, () => {
            console.log('СЕРВЕР ЗАПУЩЕН НА ПОРТУ 4000')
        })
    });
