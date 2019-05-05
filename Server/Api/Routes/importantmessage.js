
var express = require('express');
const mongoose = require('mongoose');
var app = express();
const router = express.Router();
const IMessage = require('../../models/importantmessages');
const axios = require('axios');
const authManager = require('../../Managers/AuthManager');
const NotificationManager = require('../../Managers/NotificationManager');

const User = require('../../models/user');

var dateNow = new Date();
var dd = dateNow.getDate();
var monthSingleDigit = dateNow.getMonth() + 1,
    mm = monthSingleDigit < 10 ? '0' + monthSingleDigit : monthSingleDigit;
var yy = dateNow.getFullYear().toString().substr(2);
var formattedDate = dd + '/' + mm + '/' + yy;


/*Service add a message*/
router.post('/addmessage', async(req, res, next) => {
    // Checking if the token recieved is valid.
    let isAuth = await authManager.isTokenValidAsync(req.headers.token, 5)
    if (!isAuth) {
        return res.status(401).send({ 'success': false });
    }
    const message = new IMessage({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        contect: req.body.contect,
        link: req.body.link,
        readby: [],
        createdtime: formattedDate,
        createdAt: new Date()
    });

    message.save().then(() => {
        let isNotification = NotificationManager.SendNotificationAsync("קרביץ עובדים",'הודעה חשובה עלתה נא להכנס',req.headers.token);
        if (!isNotification) {
            return res.status(401).send({ 'success': false });
        }
    }).then((result) => {
        res.status(201).json({
            message: 'Created Imessage successfully',
            createdMessage: result
        })
    }).catch(err => {
        res.status(401).json({error: err})
    })

});



/*Service get all*/
router.get('', async(req, res, next) => {
    // Checking if the token recieved is valid.
    let isAuth = await authManager.isTokenValidAsync(req.headers.token, 1)
    if (!isAuth) {
        return res.status(401).send({ 'success': false });
    }
    IMessage.find().exec().then(doc => {
        if (doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({ message: 'No valid found for Messages' });
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    });
});

/*Service return to user how many unread messages he has*/
router.post('/unreadCount', (req, res, next) => {
    IMessage.find({ readby: { $ne: req.body.id } }).countDocuments().then(docs => {
        res.send({ docs });
    }).catch(err => {
        res.status(401).json({ error: err });
    });
});
/*Service return all the unread messages of the specific user*/
router.post('/unread', async (req, res, next) => {
    let isAuth = await authManager.isTokenValidAsync(req.headers.token, 1)
    if (!isAuth) {
        return res.status(401).send({'success': false});
    }
    IMessage.find({readby: {$ne: req.body.id}}).then(docs => {
        res.status(200).json(docs);
    }).catch(err => {
        res.status(401).json({error: err});
    });

});
router.post('/pushread', async (req, res, next) => {
    let isAuth = await authManager.isTokenValidAsync(req.headers.token, 1)
    if (!isAuth) {
        return res.status(401).send({'success': false});
    }
    IMessage.updateOne({
        _id: req.body._id,
        readby: {$nin: [req.body.id]}
    }, {$push: {readby: req.body.id}}).then(docs => {
        res.status(200).json({docs: docs.nModified});
    })

});



/*Service delete a message*/
router.post('/deletemessage', async (req, res, next) => {

    // Checking if the token recieved is valid. 
    let isAuth = await authManager.isTokenValidAsync(req.headers.token, 5)
    if (!isAuth) {
        return res.status(401).send({ 'success': false });
    }
    IMessage.deleteOne({ _id: req.body._id })
        .then(result => {
            res.status(200).json({
                message: 'Message deleted'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});
/*Service edit a message by id*/
router.patch('/editMessage/:id', async (req, res, next) => {

    // Checking if the token recieved is valid. 
    let isAuth = await authManager.isTokenValidAsync(req.headers.token, 5)
    if (!isAuth) {
        return res.status(401).send({ 'success': false });
    }
    const id = req.params.id;
    const updateOpt = {};
    for (const ops of req.body) {
        updateOpt[ops.propName] = ops.value;
    }
    IMessage.updateOne({ _id: id }, { $set: updateOpt })
        .exec().then(result => {
        res.status(200).json({
            message: 'Message updated'
        });
    })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});
module.exports = router;