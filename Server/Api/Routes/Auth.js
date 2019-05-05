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
var nodemailer = require("nodemailer");
var crypto = require('crypto');
app.use(bodyParser.json());
var HashChange = [];
var smtpTrans = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        user: "kravitzservice@gmail.com",
        clientId: "150013384775-36rnvmgm6qt78u21i7jg65la6baallhh.apps.googleusercontent.com",
        clientSecret: "yYe-KovgFjjnrKLb4TvX_VnI",
        refreshToken: "1/Mql8BNudzy3a-0J90gVj8COcss2D9Z1xWoZEsunOAf6LfX0WdYjK5BeYyQNsIFB3",
        accessToken: 'ya29.GlveBhKHzIcxsUOdsviGwpsTLRFr2hIEcyrnm6vBFLhAFPqd0Q47iw_FHP-CrMntVtgLKNZNPMgXP9B4X4HRF8b2ep6ZkWanK7Fse0WcmbHGy9rSkEtoA9Xb8CsI'
    }
});

/*Service Forget Password*/
router.post('/forget',jsonParser, async (req, res, next) => {
    var x = await crypto.createHash('md5').update('idanlazar8241@gmail.com' + Math.random(1000)).digest("hex").slice(0, 6);
    HashChange.push(x);
    var mailOptions = {
        from: 'idanlazar1112@gmail.com',
        to: req.body.mail,
        subject: 'בקשת שינוי סיסמה',
        text: 'הנה הכנס את הקוד ' + x + ' לתוך האפליקציה כדי לשחזר את הסיסמה'
    };
    User.findOne({email: req.body.mail}).then( user => {
        if (user) {
            smtpTrans.sendMail(mailOptions, function (error, response) {
                if (error) {
                    console.log(error);
                    return res.send({'success': false});
                } else {
                    console.log(response);
                    return res.send({'success': true});
                }
                smtpTrans.close();
            });
        }
        else{return res.send({'success': false});}


    });



});
/*Service Verify Code Forget Password*/
router.post('/verifycode',jsonParser, async (req, res, next) => {
    if(HashChange.find((element)=> element === req.body.code))
    {
        HashChange.remove(req.body.code);
        User.findOne({email: req.body.mail}).then(user => {
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