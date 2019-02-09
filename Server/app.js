const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://ronel:!!1122oo@kra-t6f6u.mongodb.net/kra?retryWrites=true',{
    useMongoClient:true
}).then(()=>{
    console.log("connected to DB");
}).catch(()=>{
    console.log("connection failed");
});

const functionRoutes = require('./Api/Routes/user/adduser');

app.use('/login',functionRoutes );

module.exports = app;
