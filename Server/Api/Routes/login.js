const bodyParser = require("body-parser");
var express = require('express');;
const User = require('../../models/user');

var app = express();
const router = express.Router();
var jsonParser = bodyParser.json();

app.use(bodyParser.json());


router.post('/',jsonParser,(req,res,next) => {
    var user = null;
    var bool = false;

    User.findOne(req.body,function (err,result) {
        if (err) throw err;
        if (result) {
            bool = true;
            user= result;
            console.log("1 document exist");
        }
        console.log(user);
        res.send({'success': bool,'user': user});

    });
});



module.exports = router;
