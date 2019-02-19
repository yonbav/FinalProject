const bodyParser = require("body-parser");
var express = require('express');
const mongoose = require('mongoose');
var app = express();
const router = express.Router();
var jsonParser = bodyParser.json();
app.use(bodyParser.json());
const User = require('../../models/user');
router.get('/',(req,res,next) => {
    User.find().select('firstname lastname birthday').exec().then(docs=> {
        res.send(docs)
    })

});



module.exports = router;
