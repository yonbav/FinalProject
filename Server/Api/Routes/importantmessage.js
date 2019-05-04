
var express = require('express');
const mongoose = require('mongoose');
var app = express();
const router = express.Router();
const IMessage = require('../../models/importantmessages');
const axios = require('axios');
const User = require('../../models/user');

var dateNow = new Date();
var dd = dateNow.getDate();
var monthSingleDigit = dateNow.getMonth() + 1,
    mm = monthSingleDigit < 10 ? '0' + monthSingleDigit : monthSingleDigit;
var yy = dateNow.getFullYear().toString().substr(2);
var formattedDate = dd + '/' + mm + '/' +yy;


/*Service add a message*/
router.post('/addmessage',(req,res,next) => {
    if(req.headers.token)
    {
        User.findOne({token: req.headers.token}).then(user => {
            if(user) {
                const message = new IMessage({
                    _id: new mongoose.Types.ObjectId(),
                    title: req.body.title,
                    contect: req.body.contect,
                    link: req.body.link,
                    readby: [],
                    createdtime: formattedDate,
                    createdAt: new Date()
                });

                message.save().then(result => {
                    axios.post('http://192.168.1.34:3000/daily/notification', {
                        title: "קרביץ עובדים",
                        message: 'הודעה חדשה עלתה נא להכנס'
                    }).then(() => {
                        res.status(201).json({
                            message: 'Created Imessage successfully',
                            createdMessage: result
                        })
                    })
                }).catch(err => {
                    res.status(401).json({error: err});
                });
            }
            else{
                return res.send({'success': false});
            }
        });

    }
    else{
        return res.send({'success': false});
    }
    });


/*Service get all*/
router.get('', (req,res,next) => {
    if(req.headers.token) {
        User.findOne({token: req.headers.token}).then(user => {
            if (user) {
                IMessage.find().exec().then(doc => {
                    if (doc) {
                        res.status(200).json(doc);
                    } else {
                        res.status(404).json({message: 'No valid found for Messages'});
                    }
                })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({error: err});
                    });
            } else {
                return res.send({'success': false});
            }
        });
    }else {
        return res.send({'success': false});
    }

});

/*Service return to user how many unread messages he has*/
router.post('/unreadCount',(req,res,next) => {
    IMessage.find({readby: {$ne: req.body.id}}).countDocuments().then(docs=> {
        res.send({docs});
    }).catch(err=> {
        res.status(401).json({error:err});
    });
});
/*Service return all the unread messages of the specific user*/
router.post('/unread',(req,res,next) => {
    if(req.headers.token) {
        User.findOne({token: req.headers.token}).then(user => {
            if (user) {
                IMessage.find({readby: {$ne: req.body.id}}).then(docs => {
                    res.status(200).json(docs);
                }).catch(err => {
                    res.status(401).json({error: err});
                });
            } else {
                return res.send({'success': false});
            }
        });
    }else {
        return res.send({'success': false});
    }


});
router.post('/pushread',(req,res,next) => {

    if(req.headers.token) {
        User.findOne({token: req.headers.token}).then(user => {


            if (user) {
                IMessage.updateOne({
                    _id: req.body._id,
                    readby: {$nin: [req.body.id]}
                }, {$push: {readby: req.body.id}}).then(docs => {
                    res.status(200).json({docs: docs.nModified});
                })
            } else {
                return res.send({'success': false});
            }
        });
    }else {
        return res.send({'success': false});
    }
});



/*Service delete a message*/
router.post('/deletemessage',(req,res,next) => {
    if(req.headers.token) {
        User.findOne({token: req.headers.token}).then(user => {
            if (user) {
    IMessage.deleteOne({_id:req.body._id})
        .then(result=>{
            res.status(200).json({
                message:'Message deleted'
            });
        })
        .catch(err=> {
            console.log(err);
            res.status(500).json({error:err});
        });
            } else {
                return res.send({'success': false});
            }
        });
    }else {
        return res.send({'success': false});
    }
});
/*Service edit a message by id*/
router.patch('/editMessage/:id',(req,res,next) => {
    if(req.headers.token) {
        User.findOne({token: req.headers.token}).then(user => {
            if (user) {
    const id = req.params.id;
    const updateOpt = {};
    for (const ops of req.body){
        updateOpt[ops.propName] = ops.value;
    }
    IMessage.updateOne({_id:id},{$set : updateOpt})
        .exec().then(result=>{
        res.status(200).json({
            message:'Message updated'
        });
    })
        .catch(err=> {
            console.log(err);
            res.status(500).json({error:err});
        });
            } else {
                return res.send({'success': false});
            }
        });
    }else {
        return res.send({'success': false});
    }
});
module.exports = router;