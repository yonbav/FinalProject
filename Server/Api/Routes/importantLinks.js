
var express = require('express');
const mongoose = require('mongoose');
var app = express();
const router = express.Router();
const Link = require('../../models/ImportantLinks');
const User = require('../../models/user');

/*Service add a Link*/
router.post('/addlink',(req,res,next) => {
    if(req.headers.token)
    {
        User.findOne({token: req.headers.token}).then(user => {
            if(user) {
    const link = new Link({
        _id: new mongoose.Types.ObjectId(),
        title:req.body.title,
        url:req.body.url,
    });
    link.save().then(result =>{
            res.status(201).json({
                message: 'Created Link successfully',
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


/*Service get all*/
router.get('', (req,res,next) => {
    if(req.headers.token)
    {
        User.findOne({token: req.headers.token}).then(user => {
            if(user) {

    Link.find().exec().then(doc=>{
        if(doc) {
            res.status(200).json(doc);
        }else{
            res.status(404).json({message : 'No valid found for Link'});
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
/*Service get by id*/
router.get('/:id', (req,res,next) => {
    if(req.headers.token)
    {
        User.findOne({token: req.headers.token}).then(user => {
            if(user) {

    Link.findOne({title: req.params.id}).exec().then(doc=>{
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

/*Service delete a message*/
router.post('/deletelink',(req,res,next) => {
    if(req.headers.token)
    {
        User.findOne({token: req.headers.token}).then(user => {
            if(user) {

    Link.deleteOne({_id:req.body._id})
        .then(result=>{
            res.status(200).json({
                message:'Link deleted'
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
/*Service edit a message by id*/
router.patch('/editLink/:id',(req,res,next) => {
    if(req.headers.token)
    {
        User.findOne({token: req.headers.token}).then(user => {
            if(user) {
    const id = req.params.id;
    const updateOpt = {};
    for (const ops of req.body){
        updateOpt[ops.propName] = ops.value;
    }
    Link.updateOne({_id:id},{$set : updateOpt})
        .exec().then(result=>{
        res.status(200).json({
            Link:'Link updated'
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