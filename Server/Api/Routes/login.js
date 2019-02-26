const bodyParser = require("body-parser");
var express = require('express');;
const User = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var app = express();
const router = express.Router();
var jsonParser = bodyParser.json();

app.use(bodyParser.json());

router.post('/',jsonParser,(req,res,next) => {
    console.log(req.body.id);
    User.findOne({id: req.body.id }).then(user => {
        if (user) {
            return checkPassword(user, req.body.password, res,req.body.authorization);
        }
        return res.send({'success': false});

    });
});
checkPassword = (user, password, res,authorization) => {
    fetchedUser = user;
    return bcrypt.compare(password, user.password).then(result => {
        if (!result) {
            return res.send({'success': false});
        }
        user= user.toObject();
        delete user.id;
        delete user.password;
        if(authorization <= user.authorization){
            console.log("lala");
            res.send({'success': true,'user': user});
        }
        else{
            return res.send({'success': false});
        }

    }).catch(err => {
        return res.send({'success': false});
    });
}
module.exports = router;
