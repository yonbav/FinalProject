var express = require('express');
const mongoose = require('mongoose');
var app = express();
const router = express.Router();
const Info = require('../../models/Minhal');
const multer = require('multer');
const fs = require('fs');
const { promisify } = require('util')
const User = require('../../models/user');
const authManager = require("../../Managers/AuthManager");

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
router.post('/addMinhal',upload.single('InfoImage'), async (req, res, next) => {
    try {
        let isAuth = await authManager.isTokenValidAsync(req.headers.token, 5)
        if (!isAuth) {
            return res.status(401).send({ 'success': false });
        }
        const info = new Info({
            _id: new mongoose.Types.ObjectId(),
            title: req.body.title,
            image: "Information/" + req.file.filename
        });
        info.save().then(result => {
            res.status(201).json({
                message: 'Created information successfully',
                createdMessage: result
            })
        }).catch(err => {
            res.status(401).json({ error: err });
        });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});

/*Service get by id*/
router.get('/:id', async (req, res, next) => {
    try {
        let isAuth = await authManager.isTokenValidAsync(req.headers.token, 1)
        if (!isAuth) {
            return res.status(401).send({ 'success': false });
        }
        Info.findOne({ title: req.params.id }).exec().then(doc => {
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({ message: 'No valid found for Info' });
            }
        }).catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});

/*Service get all pdf's*/
router.get('/', async (req, res, next) => {
    try {
        let isAuth = await authManager.isTokenValidAsync(req.headers.token, 1)
        if (!isAuth) {
            return res.status(401).send({ 'success': false });
        }
        Info.find().exec().then(doc => {
            if (doc) {
                res.status(200).json(doc.reverse());
            } else {
                res.status(404).json({ message: 'No valid found for Info' });
            }
        }).catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});

/*Service delete a pdf*/
router.post('/deleteMinhal',upload.single('InfoImage'),async (req,res,next) => {
    try {
        let isAuth = await authManager.isTokenValidAsync(req.headers.token, 5)
        if (!isAuth) {
            return res.status(401).send({ 'success': false });
        }
        await unlinkAsync(req.body.image);
        Info.deleteOne({ _id: req.body._id }).then(result => {
            res.status(200).json({
                message: 'Info deleted'
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
/*Service edit a pdf by id*/
router.patch('/editinfo/:id', async (req, res, next) => {
    try {
        let isAuth = await authManager.isTokenValidAsync(req.headers.token, 5)
        if (!isAuth) {
            return res.status(401).send({ 'success': false });
        }
        const id = req.params.id;
        const updateOpt = {};
        for (const ops of req.body) {
            updateOpt[ops.propName] = ops.value;
        }
        Info.updateOne({ _id: id }, { $set: updateOpt })
            .exec().then(result => {
                res.status(200).json({
                    message: 'Info updated'
                });
            }).catch(err => {
                console.log(err);
                res.status(500).json({ error: err });
            });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
module.exports = router;
