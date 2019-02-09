const bodyParser = require("body-parser");
var express = require('express');
const mongoose = require('mongoose');

var app = express();
const router = express.Router();
var jsonParser = bodyParser.json();

app.use(bodyParser.json());


router.post('/',jsonParser,(req,res,next) => {
    var user = null;
    var bool = false;
    var id = req.body.id;
    var password = req.body.password;
    var authorization=req.body.authorization;
    var myobj = {id, password,authorization};

    myobj.findOne(req.body,function (err,result) {

        if (result) {
            bool = true;
            user= result;
            console.log("1 document exist");
        }
        console.log(user);
        res.send({'success': bool,'user': user });
    });
});
