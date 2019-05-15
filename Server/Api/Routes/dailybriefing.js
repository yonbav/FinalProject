var express = require('express');
const mongoose = require('mongoose');
var app = express();
const router = express.Router();
const DailyBriefing = require('../../models/dailybriefing');
const Notifications = require('../../models/Notifications.');
const axios = require('axios');
const User = require('../../models/user');
const authManager = require('../../Managers/AuthManager');
const multer = require('multer');
const fs = require('fs');
const DAILY_BRIEFING_PATH = "./Information/";
const NotificationManager = require("../../Managers/NotificationManager"); 
const DailyBriefingManager = require("../../Managers/DailyBriefingManager");
const { Expo } = require('expo-server-sdk');
const { promisify } = require('util');
const { convertJsonToUpdateOpt } = require('../../Managers/UtilsManager');
const unlinkAsync = promisify(fs.unlink);
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, DAILY_BRIEFING_PATH);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });
var somePushTokens = [];

/*Service Add Client to notification list*/
router.post('/registarnotification', async (req, res, next) => {
    try {
        // Checking if the token recieved is valid. 
        let isAuth = await authManager.isTokenValidAsync(req.headers.token, 5)
        if (!isAuth) {
            return res.status(401).send({ 'success': false });
        }

        const notification = new Notifications({
            _id: new mongoose.Types.ObjectId(),
            id: req.body.token.value,
        });
        Notifications.findOne({ id: req.body.token.value }).exec().then(doc => {
            if (doc) {
                res.status(200).json(doc);
            } else {
                notification.save().then(result => {
                    res.status(201).json({
                        message: 'registar notification successfully',
                    })
                }).catch(err => {
                    res.status(401).json({ error: err });
                });
            }
        }).catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
    }
    catch (err) {
        res.status(500).json({ error: err })
    }
});
/*Service Add Daily Brifing*/
router.post('/adddailybrief', upload.single('DailyBriefImage'), async (req, res, next) => {
    try {
        // Checking if the token recieved is valid. 
        let isAuth = await authManager.isTokenValidAsync(req.headers.token, 5)
        if (!isAuth) {
            return res.status(401).send({ 'success': false });
        }

        const dailybriefing = new DailyBriefing({
            _id: new mongoose.Types.ObjectId(),
            title: req.body.title,
            readby: [],
            image: req.body.image,
            createdAt: new Date(req.body.date)
        });

        dailybriefing.save().then(() => {
            let isNotification = NotificationManager.SendNotificationAsync("קרביץ עובדים", 'תדריך יומי עלה נא להכנס', req.headers.token,'Daily');
            if (!isNotification) {
                return res.status(401).send({ 'success': false });
            }
        }).then(() => {
            res.status(201).json({
                message: 'Created DailyBrif successfully',
            })
        }).catch(err => {
            res.status(401).json({ error: err })
        })
    }
    catch (err) {
        res.status(500).json({ error: err })
    }
});
/*Service Get Daily Brifing by id*/
router.get('/:id', (req, res, next) => {
    try {
        DailyBriefing.findOne({ title: req.params.id }).exec().then(doc => {
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
        res.status(500).json({ error: err })
    }
});
/*Service Get All Daily Brifing*/
router.get('/', async (req, res, next) => {
    try {
        // Checking if the token recieved is valid. 
        let isAuth = await authManager.isTokenValidAsync(req.headers.token, 1);
        if (!isAuth) {
            return res.status(401).send({ 'success': false });
        }
        DailyBriefing.find().sort({ createdAt: -1 }).limit(7).exec().then(doc => {
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({ message: 'No valid found for DailyBriefing' });
            }
        }).catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
    }
    catch (err) {
        res.status(500).json({ error: err })
    }
});
/*Service return all the unread daily brifing of the specific user*/
router.post('/unread', async (req, res, next) => {
    try {
        let isAuth = await authManager.isTokenValidAsync(req.headers.token, 1)
        if (!isAuth) {
            return res.status(401).send({ 'success': false });
        }

        DailyBriefing.findOne({ title: req.body.title, readby: { $ne: req.body.id } }).then(docs => {
            res.status(200).json({ docs });
        }).catch(err => {
            res.status(401).json({ error: err });
        });
    }
    catch (err) {
        res.status(500).json({ error: err })
    }
});
/*Service marker read all the unread daily brifing*/
router.post('/pushread', async (req, res, next) => {
    try {
        let isAuth = await authManager.isTokenValidAsync(req.headers.token, 1)
        if (!isAuth) {
            return res.status(401).send({ 'success': false });
        }
        DailyBriefing.updateOne({
            title: req.body.title,
            readby: { $nin: [req.body.id] }
        }, { $push: { readby: req.body.id } }).then(docs => {
            res.status(200).json({ docs: docs.nModified });
        }).catch(err => {
            res.status(401).json({ error: err });
        });
    }
    catch (err) {
        res.status(500).json({ error: err })
    }
});


/*Service Delete daily brifing*/
router.post('/deletedailybrief', upload.single('DailyBriefImage'), async (req, res, next) => {
    try {
        // Checking if the token recieved is valid. 
        let isAuth = await authManager.isTokenValidAsync(req.headers.token, 5)
        if (!isAuth) {
            return res.status(401).send({ 'success': false });
        }

        var briefingFileName = await DailyBriefingManager.findFileNameByIdAsync(req.body._id)        
        unlinkAsync(DAILY_BRIEFING_PATH + briefingFileName).catch(err => log(`Dialy Briefing failed to delete file. error: ${err}`));
        DailyBriefing.deleteOne({ _id: req.body._id })
            .then(result => {
                res.status(200).json({
                    message: 'DailyBriefing deleted'
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: err });
            });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});

/*Service edit daily brifing*/
router.post('/editdailybrief/:id', upload.single('DailyBriefImage'), async (req, res, next) => {
    try {
        // Checking if the token recieved is valid. 
        let isAuth = await authManager.isTokenValidAsync(req.headers.token, 5)
        if (!isAuth) {
            return res.status(401).send({ 'success': false });
        }

        const id = req.params.id;

        // Checking if the file was edited and we need to delete the old one
        var briefingFileName = await DailyBriefingManager.findFileNameByIdAsync(id)
        if (req.file && req.file.filename && req.file.filename !== briefingFileName)
            unlinkAsync(DAILY_BRIEFING_PATH + briefingFileName).catch(err => log(`Dialy Briefing failed to delete file. error: ${err}`));

        let updateOpt = convertJsonToUpdateOpt(req.body);
        DailyBriefing.updateOne({ _id: id }, { $set: updateOpt })
            .exec().then(result => {
                res.status(200).json({
                    message: 'dailybrief updated'
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: err });
            });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
module.exports = router;
