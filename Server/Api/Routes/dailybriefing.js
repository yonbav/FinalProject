var express = require('express');
const mongoose = require('mongoose');
var app = express();
const router = express.Router();
const DailyBriefing = require('../../models/dailybriefing');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req,file,cb) {
        cb(null,'./uploads/');
    },
    filename: function (req,file,cb) {
        cb(null,file.originalname);
    }
});
const upload = multer({storage:storage});



router.post('/adddailbrief',upload.single('DailyBriefImage'),(req,res,next) => {
    const dailybriefing = new DailyBriefing({
        _id: new mongoose.Types.ObjectId(),
        title:req.body.title,
        readby:[],
        image: "uploads/"+req.file.filename
    });
    dailybriefing.save().then(result =>{
        res.status(201).json({
            message:'Created DailyBriefing successfully',
            createdMessage: result
        })
    }).catch(err=> {
        res.status(401).json({error:err});
    });
});



router.get('/', (req,res,next) => {
    DailyBriefing.find().exec().then(doc=>{
        if(doc) {
            res.status(200).json(doc);
        }else{
            res.status(404).json({message : 'No valid found for DailyBriefing'});
        }
    })
        .catch(err=> {
            console.log(err);
            res.status(500).json({error:err});
        });
});


router.post('/unreadCount',(req,res,next) => {
    DailyBriefing.find({readby: {$ne: req.body.id}}).countDocuments().then(docs=> {
        res.send({docs});
    }).catch(err=> {
        res.status(401).json({error:err});
    });
});
router.post('/unread',(req,res,next) => {
    DailyBriefing.find({readby: {$ne: req.body.id}}).then(docs=> {
        res.status(200).json(docs);
    }).catch(err=> {
        res.status(401).json({error:err});
    });
});
router.post('/pushread',(req,res,next) => {
    DailyBriefing.updateOne({ readby: { $nin: [req.body.id] } }, { $push: { readby: req.body.id}  }).then(docs=> {
        res.status(200).json({docs: docs.nModified});
    }).catch(err=> {
        res.status(401).json({error:err});
    });
});



router.post('/deletedailybrief',(req,res,next) => {
    DailyBriefing.deleteOne({_id:req.body._id})
        .then(result=>{
            res.status(200).json({
                message:'DailyBriefing deleted'
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
    DailyBriefing.updateOne({_id:id},{$set : updateOpt})
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
