const bodyParser = require("body-parser");
var express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var app = express();
const router = express.Router();
var jsonParser = bodyParser.json();

app.use(bodyParser.json());

const User = require('../../models/user');

router.post('/adduser',jsonParser,(req,res,next) => {
    bcrypt.hash(req.body.password, 10).then(hash => {
       const user = new User({
            _id: new mongoose.Types.ObjectId(),
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            id:req.body.id,
            password:hash ,
            birthday:req.body.birthday,
            authorization:req.body.authorization,
            gender:req.body.gender,
            phone_number:req.body.phone_number,
            branch:req.body.branch,
           token: null
        });
        user.save().then(result =>{
            res.status(201).json({
                message:'Created user successfully',
                createdUser: result
            })
        }).catch(err=> {
            res.status(401).json({error:err});
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
        User.findOne({_id: id})
            .then((user) => {
                console.log(user.password);
                bcrypt.compare(req.body.Oldpassword, user.password).then(result => {
                    if (result) {
                        bcrypt.hash(req.body.Newpassword, 10).then(hash2 => {
                            User.updateOne({_id: id}, {password: hash2})
                                .exec().then(() => {
                                res.status(200).json({
                                    success: true
                                });
                            })
                                .catch(err => {
                                    console.log(err);
                                    res.status(500).json({error: err});
                                });
                        })
                    } else {
                        res.status(200).json({
                            success: false
                        });
                    }
                })
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
