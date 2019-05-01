const bodyParser = require("body-parser");
var express = require('express');
const mongoose = require('mongoose');
var app = express();
const router = express.Router();
var jsonParser = bodyParser.json();
app.use(bodyParser.json());
const User = require('../../models/user');

/*Service return all the users and there Birthdays*/
router.get('/',(req,res,next) => {
    if(req.headers.token)
    {
        User.findOne({token: req.headers.token}).then(user => {
            if(user) {
    User.find().select('firstname lastname birthday').exec().then(docs=> {
        res.send(docs)
    })}
            else{
                return res.send({'success': false});
            }
        });

    }
    else{
        return res.send({'success': false});
    }

});







module.exports = router;
