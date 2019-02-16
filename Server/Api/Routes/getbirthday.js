var date = require('date-utils');
const bodyParser = require("body-parser");
var express = require('express');
const mongoose = require('mongoose');
var app = express();
const router = express.Router();
var jsonParser = bodyParser.json();

app.use(bodyParser.json());

const User = require('../../models/user');

var dateNow = new Date();
var dd = dateNow.getDate();
var monthSingleDigit = dateNow.getMonth() + 1,
    mm = monthSingleDigit < 10 ? '0' + monthSingleDigit : monthSingleDigit;
var formattedDate = dd + '/' + mm + '/';
router.get('/',(req,res,next) => {
    User.find({ birthday: { $regex: formattedDate }}).select('firstname lastname branch').exec().then(docs=> {
        res.send(docs)
    })

});



module.exports = router;
