var express = require('express');
const mongoose = require('mongoose');
var app = express();
const router = express.Router();
const Info = require('../../models/importantinformation');
const multer = require('multer');
const fs = require('fs');
const { promisify } = require('util')

const unlinkAsync = promisify(fs.unlink);
const storage = multer.diskStorage({
    destination: function (req,file,cb) {
        cb(null,'./Information/');
    },
    filename: function (req,file,cb) {
        cb(null,file.originalname);
    }
});
const upload = multer({storage:storage});



router.post('/addinfo',upload.single('InfoImage'),(req,res,next) => {
    const info = new Info({
        _id: new mongoose.Types.ObjectId(),
        title:req.body.title,
        image: "Information/"+req.file.filename
    });
    info.save().then(result =>{
        res.status(201).json({
            message:'Created information successfully',
            createdMessage: result
        })
    }).catch(err=> {
        res.status(401).json({error:err});
    });
});


router.get('/:id', (req,res,next) => {
    Info.findOne({title: req.params.id}).exec().then(doc=>{
        if(doc) {
            res.status(200).json(doc);
        }else{
            res.status(404).json({message : 'No valid found for Info'});
        }
    })
        .catch(err=> {
            console.log(err);
            res.status(500).json({error:err});
        });
});


router.get('/', (req,res,next) => {
    Info.find().exec().then(doc=>{
        if(doc) {
            res.status(200).json(doc.reverse());
        }else{
            res.status(404).json({message : 'No valid found for Info'});
        }
    })
        .catch(err=> {
            console.log(err);
            res.status(500).json({error:err});
        });
});

router.post('/deleteinfo',upload.single('InfoImage'),async (req,res,next) => {
    await unlinkAsync(req.body.image);
    Info.deleteOne({_id:req.body._id})
        .then(result=>{
            res.status(200).json({
                message:'Info deleted'
            });
        })
        .catch(err=> {
            console.log(err);
            res.status(500).json({error:err});
        });

});

router.patch('/editinfo/:id',(req,res,next) => {
    const id = req.params.id;
    const updateOpt = {};
    for (const ops of req.body){
        updateOpt[ops.propName] = ops.value;
    }
    Info.updateOne({_id:id},{$set : updateOpt})
        .exec().then(result=>{
        res.status(200).json({
            message:'Info updated'
        });
    })
        .catch(err=> {
            console.log(err);
            res.status(500).json({error:err});
        });
});
module.exports = router;
