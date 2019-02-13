const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://ronel:!!1122oo@kra-t6f6u.mongodb.net/kra?retryWrites=true',{
    useNewUrlParser: true
}).then(()=>{
    console.log("connected to DB");
}).catch(()=>{
    console.log("connection failed");
});

const functionAddUser = require('./Api/Routes/user/adduser');
const functionLogin = require('./Api/Routes/login');
const functionRemoveUser= require('./Api/Routes/user/removeuser');
//const functionEditUser = require('./Api/Routes/user/edituser');

app.use('/user/adduser',functionAddUser);
app.use('/login',functionLogin );
app.use('/user/removeuser',functionRemoveUser );
//app.use('/user/edituser',functionEditUser );


module.exports = app;
