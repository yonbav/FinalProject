const bodyParser = require("body-parser");
var express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(bodyParser.json());
const User = require('./models/user');
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods","GET , POST , DELETE , PUT , PATCH");
    next();
});
mongoose.connect('mongodb+srv://ronel:!!1122oo@kra-t6f6u.mongodb.net/kra?retryWrites=true',{
    useNewUrlParser: true
}).then(()=>{
    console.log("connected to DB");
}).catch(()=>{
    console.log("connection failed");
});


const userfunc = require("./Api/Routes/userfunctions");
const loginfunc = require("./Api/Routes/login");
const birthdayfunc = require("./Api/Routes/getbirthday");

app.use("/user", userfunc);
app.use("/login",loginfunc);
app.use("/getBD",birthdayfunc);

var ip = require("ip");
console.dir ( ip.address() );

module.exports = app;
