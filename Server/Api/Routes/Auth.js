const bodyParser = require("body-parser");
var express = require('express');;
const User = require('../../models/user');
const bcrypt = require('bcrypt');
var config = require('../../config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Nexmo = require('nexmo');

var app = express();
const router = express.Router();
var jsonParser = bodyParser.json();
mongoose.set('useFindAndModify', false);
var nodemailer = require("nodemailer");
var crypto = require('crypto');
app.use(bodyParser.json());
var HashChange = [];
const nexmo = new Nexmo({
    apiKey: 'f2988f2c',
    apiSecret: 'wz65b1RO4yZVqtZK'
})
const from = 'kravitz';
/*Service Forget Password*/
router.post('/forget',jsonParser, async (req, res, next) => {
    var x = await crypto.createHash('md5').update('idanlazar8241@gmail.com' + Math.random(1000)).digest("hex").slice(0, 6);
    HashChange.push(x);
    const text = 'Your code is:' + x;
    const to = '972'+req.body.mail;

    User.findOne({phone_number: req.body.mail}).then( user => {
        if (user) {
            nexmo.message.sendSms(from, to, text);
            return res.send({'success': true});
        }
        else{return res.send({'success': false});}
    });



});
/*Service Verify Code Forget Password*/
router.post('/verifycode',jsonParser, async (req, res, next) => {
    if(HashChange.find((element)=> element === req.body.code))
    {
        HashChange.remove(req.body.code);
        User.findOne({phone_number: req.body.mail}).then(user => {
            if (user) {
                return res.send(user);
            }
        });

    }
    else{return res.send({'success': false});}
});



/*Service Check if the token is alive*/
router.post('/CheckToken',jsonParser,(req,res,next) => {
    User.findOne({id: req.body.id}).then(user => {
        if (user) {
            jwt.verify(req.body.token, config.secret, function (err, decoded) {
                if (err) {
                    User.findOneAndUpdate({id: req.body.id}, {token: null}, {new: true}, function (err, doc) {
                        return res.send({'success': false});
                    })

                } else {
                    return res.send({'success': true});

                }
            });
        }
        else {
            return res.send({'success': false});
        }
    });
});
/*Service Login*/

router.post('/login', jsonParser, (req, res, next) => {

    User.findOne({id: req.body.id}).then(user => {
        if (user) {
            return checkPassword(user, req.body.password, res, req.body.authorization);
        }
        return res.send({'success': false});

    });
});

router.post('/logout',jsonParser,(req,res,next) => {
    User.findOneAndUpdate({id: req.body.id}, {token: null}, {new: true},function(err, doc) {
        if(err){return res.send({'success': false});}
        else{return res.send({'success': true});}
    })
});

checkPassword = (user, password, res,authorization) => {
    fetchedUser = user;
    return bcrypt.compare(password, user.password).then(result => {
        if (!result) {
            return res.send({'success': false});
        }

        if (authorization <= user.authorization) {
            var token = jwt.sign({id: user._id}, config.secret, {
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
};
Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};
module.exports = router;
