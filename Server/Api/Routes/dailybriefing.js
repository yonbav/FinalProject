var express = require('express');
const mongoose = require('mongoose');
var app = express();
const router = express.Router();
const DailyBriefing = require('../../models/dailybriefing');
const Notifications = require('../../models/Notifications.');

const multer = require('multer');
const fs = require('fs');
const { Expo } = require('expo-server-sdk');
const { promisify } = require('util');
const unlinkAsync = promisify(fs.unlink);
const storage = multer.diskStorage({
    destination: function (req,file,cb) {
        cb(null,'./uploads/');
    },
    filename: function (req,file,cb) {
        cb(null,file.originalname);
    }
});
const upload = multer({storage:storage});
var somePushTokens =[];


/*Service Add Client to notification list*/
router.post('/registarnotification',(req,res,next) => {
    const notification = new Notifications({
        _id: new mongoose.Types.ObjectId(),
        id:req.body.token.value,
    });
    Notifications.findOne({id: req.body.token.value}).exec().then(doc=>{
        if(doc) {
            res.status(200).json(doc);
        }else{
            notification.save().then(result =>{
                res.status(201).json({
                    message:'registar notification successfully',
                })
            }).catch(err=> {
                res.status(401).json({error:err});
            });
        }
    })
        .catch(err=> {
            console.log(err);
            res.status(500).json({error:err});
        });

});

/*Service Add Daily Brifing*/
router.post('/adddailybrief',upload.single('DailyBriefImage'),(req,res,next) => {
    const dailybriefing = new DailyBriefing({
        _id: new mongoose.Types.ObjectId(),
        title:req.body.title,
        readby:[],
        image: "uploads/"+req.file.filename
    });

    dailybriefing.save().then(result =>{
        res.status(201).json({
            message:'Created DailyBriefing successfully',
            createdMessage: result
        })
    }).catch(err=> {
        res.status(401).json({error:err});
    });
});

/*Service Get Daily Brifing by id*/
router.get('/:id', (req,res,next) => {
    DailyBriefing.findOne({title: req.params.id}).exec().then(doc=>{
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
/*Service Get All Daily Brifing*/
router.get('/', (req,res,next) => {
    DailyBriefing.find().exec().then(doc=>{
        if(doc) {
            res.status(200).json(doc.reverse());
        }else{
            res.status(404).json({message : 'No valid found for DailyBriefing'});
        }
    })
        .catch(err=> {
            console.log(err);
            res.status(500).json({error:err});
        });
});


/*Service return all the unread daily brifing of the specific user*/
router.post('/unread',(req,res,next) => {
    DailyBriefing.findOne({title:req.body.title , readby: {$ne: req.body.id}}).then(docs=> {
        res.status(200).json({docs});
    }).catch(err=> {
        res.status(401).json({error:err});
    });
});
/*Service marker read all the unread daily brifing*/
router.post('/pushread',(req,res,next) => {
    DailyBriefing.updateOne({ title:req.body.title , readby: { $nin: [req.body.id] } }, { $push: { readby: req.body.id}  }).then(docs=> {
        res.status(200).json({docs: docs.nModified});
    }).catch(err=> {
        res.status(401).json({error:err});
    });
});


/*Service Delete daily brifing*/
router.post('/deletedailybrief',upload.single('DailyBriefImage'),async (req,res,next) => {
    await unlinkAsync(req.body.image);
    DailyBriefing.deleteOne({_id:req.body._id})
        .then(result=>{
            res.status(200).json({
                message:'DailyBriefing deleted'
            });
        })
        .catch(err=> {
            console.log(err);
            res.status(500).json({error:err});
        });
});
/*Service edit daily brifing*/
router.patch('/editdailybrief/:id',(req,res,next) => {
    const id = req.params.id;
    const updateOpt = {};
    for (const ops of req.body){
        updateOpt[ops.propName] = ops.value;
    }
    DailyBriefing.updateOne({_id:id},{$set : updateOpt})
        .exec().then(result=>{
        res.status(200).json({
            message:'dailybrief updated'
        });
    })
        .catch(err=> {
            console.log(err);
            res.status(500).json({error:err});
        });
});




/*Service send notification for all the clients are connected*/
router.post('/notification', async (req, res, next) => {

// Create a new Expo SDK client
    let expo = new Expo();

// Create the messages that you want to send to clents
    let messages = [];
    somePushTokens =[];
    await Notifications.find({}).cursor().eachAsync(doc => {
        somePushTokens.push(doc.id);
    });

    for (let pushToken of somePushTokens) {
        console.log(pushToken);
        // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]

        // Check that all your push tokens appear to be valid Expo push tokens
        if (!Expo.isExpoPushToken(pushToken)) {
            console.error(`Push token ${pushToken} is not a valid Expo push token`);
            continue;
        }

        // Construct a message (see https://docs.expo.io/versions/latest/guides/push-notifications.html)
        messages.push({
            to: pushToken,
            sound: 'default',
            title: req.body.title,
            body: req.body.message,
            data: {withSome: 'data'},
        })
    }

// The Expo push notification service accepts batches of notifications so
// that you don't need to send 1000 requests to send 1000 notifications. We
// recommend you batch your notifications to reduce the number of requests
// and to compress them (notifications with similar content will get
// compressed).
    let chunks = expo.chunkPushNotifications(messages);
    let tickets = [];
    (async () => {
        // Send the chunks to the Expo push notification service. There are
        // different strategies you could use. A simple one is to send one chunk at a
        // time, which nicely spreads the load out over time:
        for (let chunk of chunks) {
            try {
                let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
                console.log(ticketChunk);
                tickets.push(...ticketChunk);
                // NOTE: If a ticket contains an error code in ticket.details.error, you
                // must handle it appropriately. The error codes are listed in the Expo
                // documentation:
                // https://docs.expo.io/versions/latest/guides/push-notifications#response-format
            } catch (error) {
                console.error(error);
            }
        }
    })();
    let receiptIds = [];
    for (let ticket of tickets) {
        if (ticket.id) {
            receiptIds.push(ticket.id);
        }
    }

    let receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
    (async () => {
        // Like sending notifications, there are different strategies you could use
        // to retrieve batches of receipts from the Expo service.
        for (let chunk of receiptIdChunks) {
            try {
                let receipts = await expo.getPushNotificationReceiptsAsync(chunk);
                console.log(receipts);

                // The receipts specify whether Apple or Google successfully received the
                // notification and information about an error, if one occurred.
                for (let receipt of receipts) {
                    if (receipt.status === 'ok') {
                        continue;
                    } else if (receipt.status === 'error') {
                        console.error(`There was an error sending a notification: ${receipt.message}`);
                        if (receipt.details && receipt.details.error) {
                            // The error codes are listed in the Expo documentation:
                            // https://docs.expo.io/versions/latest/guides/push-notifications#response-format
                            // You must handle the errors appropriately.
                            console.error(`The error code is ${receipt.details.error}`);
                        }
                    }
                }
            } catch (error) {
                console.error(error);
            }
        }
    })();
    res.status(201).json({
        message: "Notifications Completed",
    })

});

module.exports = router;
