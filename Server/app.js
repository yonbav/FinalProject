const express = require('express');

const app = express();

const functionRoutes = require('./Api/Routes/get_birthdays');

app.use('/get_birthdays',functionRoutes );


module.exports = app;
