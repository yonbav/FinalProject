var express = require('express');
const mongoose = require('mongoose');
var app = express();
const router = express.Router();
const IMessage = require('../../models/importantmessages');
var dateNow = new Date();
var dd = dateNow.getDate();
var monthSingleDigit = dateNow.getMonth() + 1,
    mm = monthSingleDigit < 10 ? '0' + monthSingleDigit : monthSingleDigit;
var yy = dateNow.getFullYear().toString().substr(2);
var formattedDate = dd + '/' + mm + '/' +yy;


router.post('/addmessage',(req,res,next) => {
    const message = new IMessage({
        _id: new mongoose.Types.ObjectId(),
        title:req.body.title,
        contect:req.body.contect,
        readby:[],
        createdtime:formattedDate,
    });
    message.save().then(result =>{
        res.status(201).json({
            message:'Created Imessage successfully',
            createdMessage: result
        })
    }).catch(err=> {
        res.status(401).json({error:err});
    });
});



router.get('', (req,res,next) => {
    IMessage.find().exec().then(doc=>{
        if(doc) {
            res.status(200).json(doc);
        }else{
            res.status(404).json({message : 'No valid found for Messages'});
        }
    })
        .catch(err=> {
            console.log(err);
            res.status(500).json({error:err});
        });
});


router.post('/unreadCount',(req,res,next) => {
    IMessage.find({readby: {$ne: req.body.id}}).countDocuments().then(docs=> {
        res.send({docs});
    }).catch(err=> {
        res.status(401).json({error:err});
    });
});
router.post('/unread',(req,res,next) => {
    IMessage.find({readby: {$ne: req.body.id}}).then(docs=> {
        res.status(200).json(docs);
    }).catch(err=> {
        res.status(401).json({error:err});
    });
});
router.post('/pushread',(req,res,next) => {
    IMessage.updateMany({ readby: { $nin: [req.body.id] } }, { $push: { readby: req.body.id}  }).then(docs=> {
        res.status(200).json({docs: docs.nModified});
    }).catch(err=> {
        res.status(401).json({error:err});
    });
});



router.post('/deletemessage',(req,res,next) => {
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
});

router.patch('/editMessage/:id',(req,res,next) => {
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
});
module.exports = router;