const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')

const profileRoutes = require('./routes/profiles')
const usersRoutes = require('./routes/users')


const app = express();

mongoose.connect('mongodb+srv://olafperzanowski:' + 'NwadPWZOOJdM4uMR' + '@cluster0.wjuhgvo.mongodb.net/basketball-app')
.then(() => {
    console.log('Connected to MongoDB successfully')
})
.catch(() => {
    console.log('Connection to MongoDB failed')
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use(cors());

app.use('/api/profiles/', profileRoutes);
app.use('/api/users/', usersRoutes)


module.exports = app;
