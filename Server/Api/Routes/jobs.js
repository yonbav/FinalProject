var express = require('express');
const mongoose = require('mongoose');
var app = express();
const router = express.Router();
const Job = require('../../models/jobs');
const User = require('../../models/user');

/*Service Add Job*/

router.post('/addjob',(req,res,next) => {
    if(req.headers.token)
    {
        User.findOne({token: req.headers.token}).then(user => {
            if(user) {
                const job = new Job({
                    _id: new mongoose.Types.ObjectId(),
                    title: req.body.title,
                    number: req.body.number,
                });
                job.save().then(result => {
                    res.status(201).json({
                        message: 'Created job successfully',
                        createdMessage: result
                    })
                }).catch(err => {
                    res.status(401).json({error: err});
                });
            }  else{
                    return res.send({'success': false});
                }
            });

    }
    else{
        return res.send({'success': false});
    }
});


/*Service Get All Jobs*/
router.get('', (req,res,next) => {
    if(req.headers.token)
    {
        User.findOne({token: req.headers.token}).then(user => {
            if(user) {
    Job.find().exec().then(doc=>{
        if(doc) {
            res.status(200).json(doc);
        }else{
            res.status(404).json({message : 'No valid found for Jobs'});
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
/*Service Delete Job*/

router.post('/deletejob',(req,res,next) => {
    if(req.headers.token)
    {
        User.findOne({token: req.headers.token}).then(user => {
            if(user) {
    Job.deleteOne({_id:req.body._id})
        .then(result=>{
            res.status(200).json({
                message:'Job deleted'
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
/*Service Edit Job :id*/

router.patch('/editjob/:id',(req,res,next) => {
    if(req.headers.token)
    {
        User.findOne({token: req.headers.token}).then(user => {
            if(user) {
    const id = req.params.id;
    const updateOpt = {};
    for (const ops of req.body){
        updateOpt[ops.propName] = ops.value;
    }
    Job.updateOne({_id:id},{$set : updateOpt})
        .exec().then(result=>{
        res.status(200).json({
            message:'Job updated'
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
