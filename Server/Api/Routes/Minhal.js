var express = require('express');
const mongoose = require('mongoose');
var app = express();
const router = express.Router();
const Info = require('../../models/Minhal');
const multer = require('multer');
const fs = require('fs');
const { promisify } = require('util')
const User = require('../../models/user');

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


/*Service add a pdf*/
router.post('/addMinhal',upload.single('InfoImage'),(req,res,next) => {
    if(req.headers.token)
    {
        User.findOne({token: req.headers.token}).then(user => {
            if(user) {
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

/*Service get by id*/
router.get('/:id', (req,res,next) => {
    if(req.headers.token)
    {
        User.findOne({token: req.headers.token}).then(user => {
            if(user) {

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

/*Service get all pdf's*/
router.get('/', (req,res,next) => {
    if(req.headers.token)
    {
        User.findOne({token: req.headers.token}).then(user => {
            if(user) {

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

/*Service delete a pdf*/
router.post('/deleteMinhal',upload.single('InfoImage'),async (req,res,next) => {
    if(req.headers.token)
    {
        User.findOne({token: req.headers.token}).then(async user => {
            if (user) {

                await unlinkAsync(req.body.image);
                Info.deleteOne({_id: req.body._id})
                    .then(result => {
                        res.status(200).json({
                            message: 'Info deleted'
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({error: err});
                    });
            } else {
                return res.send({'success': false});
            }
        });

    }
    else{
        return res.send({'success': false});
    }


});
/*Service edit a pdf by id*/
router.patch('/editinfo/:id',(req,res,next) => {
    if(req.headers.token)
    {
        User.findOne({token: req.headers.token}).then(user => {
            if(user) {

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
module.exports = router;