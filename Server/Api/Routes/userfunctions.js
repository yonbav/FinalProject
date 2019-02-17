const bodyParser = require("body-parser");
var express = require('express');
const mongoose = require('mongoose');

var app = express();
const router = express.Router();
var jsonParser = bodyParser.json();

app.use(bodyParser.json());

const User = require('../../models/user');

router.post('/adduser',jsonParser,(req,res,next) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        id:req.body.id,
        password:req.body.password ,
        birthday:req.body.birthday,
        authorization:req.body.authorization,
        email:req.body.email,
        gender:req.body.gender,
        phone_number:req.body.phone_number,
        branch:req.body.branch
    });
    user.save().then(result =>{
        res.status(201).json({
            message:'Created user successfully',
            createdUser: result
        })
            .catch(err=> {
                console.log(err);
                res.status(500).json({error:err});
            });

    });
});

router.get('/:userid',(req,res,next) => {
    const id = req.params.userid;
    User.findById(id).select('firstname lastname _id id').exec().then(doc=>{
        if(doc) {
            res.status(200).json({
                user: doc
            });
        }else{
            res.status(404).json({message : 'No valid entry found for ID'});
        }
    })
        .catch(err=> {
            console.log(err);
            res.status(500).json({error:err});
        });
});

router.get('', (req,res,next) => {
    User.find().exec().then(doc=>{
        if(doc) {
            res.status(200).json({
                user: doc
            });
        }else{
            res.status(404).json({message : 'No valid entry found for ID'});
        }
    })
        .catch(err=> {
            console.log(err);
            res.status(500).json({error:err});
        });
});
router.patch('/edituser/:userid',(req,res,next) => {
    const id = req.params.userid;
    const updateOpt = {};
    for (const ops of req.body){
        updateOpt[ops.propName] = ops.value;
    }
    User.update({_id:id},{$set : updateOpt})
        .exec().then(result=>{
        res.status(200).json({
            message:'User updated'
        });
    })
        .catch(err=> {
            console.log(err);
            res.status(500).json({error:err});
        });
});

router.patch('/changepassword/:userid', (req,res,next)=> {
    const id = req.params.userid;
    User.updateOne({_id:id},{password : req.body.password})
        .exec().then(result=>{
        res.status(200).json({
            message:'Password updated'
        });
    })
        .catch(err=> {
            console.log(err);
            res.status(500).json({error:err});
        });
});

router.delete('/:userid',(req,res,next) => {
    const id = req.params.userid;
    User.deleteOne({_id:id})
        .exec().then(result=>{
        res.status(200).json({
            message:'User deleted'
        });
    })
        .catch(err=> {
            console.log(err);
            res.status(500).json({error:err});
        });
});


module.exports = router;
