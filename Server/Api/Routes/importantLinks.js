
var express = require('express');
const mongoose = require('mongoose');
var app = express();
const router = express.Router();
const Link = require('../../models/ImportantLinks');
const User = require('../../models/user');
const authManager = require("../../Managers/AuthManager");

/*Service add a Link*/
router.post('/addlink', async (req, res, next) => {
    let isAuth = await authManager.isTokenValidAsync(req.headers.token, 5);
    if (!isAuth) {
        return res.status(401).send({'success': false});
    }
    const link = new Link({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        url: req.body.url,
    });
    link.save().then(result => {
        res.status(201).json({
            message: 'Created Link successfully',
            createdMessage: result
        })
    }).catch(err => {
        res.status(401).json({error: err});
    });
});


/*Service get all*/
router.get('', async (req, res, next) => {
    let isAuth = await authManager.isTokenValidAsync(req.headers.token, 1)
    if (!isAuth) {
        return res.status(401).send({'success': false});
    }
    Link.find().exec().then(doc => {
        if (doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({message: 'No valid found for Link'});
        }
    })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });

});
/*Service get by id*/
router.get('/:id', async (req, res, next) => {
    let isAuth = await authManager.isTokenValidAsync(req.headers.token, 1)
    if (!isAuth) {
        return res.status(401).send({'success': false});
    }
    Link.findOne({title: req.params.id}).exec().then(doc => {
        if (doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({message: 'No valid found for Info'});
        }
    })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });

});

/*Service delete a message*/
router.post('/deletelink', async (req, res, next) => {
    let isAuth = await authManager.isTokenValidAsync(req.headers.token, 5)
    if (!isAuth) {
        return res.status(401).send({'success': false});
    }
    Link.deleteOne({_id: req.body._id})
        .then(result => {
            res.status(200).json({
                message: 'Link deleted'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});
/*Service edit a message by id*/
router.patch('/editLink/:id', async (req, res, next) => {
    let isAuth = await authManager.isTokenValidAsync(req.headers.token, 5)
    if (!isAuth) {
        return res.status(401).send({'success': false});
    }
    const id = req.params.id;
    const updateOpt = {};
    for (const ops of req.body) {
        updateOpt[ops.propName] = ops.value;
    }
    Link.updateOne({_id: id}, {$set: updateOpt})
        .exec().then(result => {
        res.status(200).json({
            Link: 'Link updated'
        });
    })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});
module.exports = router;