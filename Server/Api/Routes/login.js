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

    User.findOne({id: req.body.id,password: req.body.password},function (err,result) {
        if (err) throw err;
        if (result) {
            bool = true;
            user= result;
            if(req.body.authorization <= user.authorization){
                console.log(user);
                res.send({'success': bool,'user': user});
            }
            else {
                bool=false;
                res.send({'success': bool});
            }
        }
        else {
            bool=false;
            res.send({'success': bool});
        }


    });
});

module.exports = router;
