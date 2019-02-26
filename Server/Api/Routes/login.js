const bodyParser = require("body-parser");
var express = require('express');;
const User = require('../../models/user');
const bcrypt = require('bcrypt');
var config = require('../../config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
var app = express();
const router = express.Router();
var jsonParser = bodyParser.json();
mongoose.set('useFindAndModify', false);

app.use(bodyParser.json());

router.post('/',jsonParser,(req,res,next) => {
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

        if (authorization <= user.authorization) {
            var token = jwt.sign({id: user._id}, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });
            User.findOneAndUpdate({id: user.id}, {token: token}, {new: true},function(err, doc) {
                doc = doc.toObject();
                delete doc.password;
                res.send({'success': true, 'user': doc});
            });

        } else {
            return res.send({'success': false});
        }

    }).catch(err => {
        return res.send({'success': false});
    });
}
module.exports = router;
