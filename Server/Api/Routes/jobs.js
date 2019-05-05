var express = require('express');
const mongoose = require('mongoose');
var app = express();
const router = express.Router();
const Job = require('../../models/jobs');
const User = require('../../models/user');
const authManager = require("../../Managers/AuthManager");

/*Service Add Job*/

router.post('/addjob', async (req, res, next) => {
    let isAuth = await authManager.isTokenValidAsync(req.headers.token, 5)
    if (!isAuth) {
        return res.status(401).send({'success': false});
    }
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
});


/*Service Get All Jobs*/
router.get('', async (req, res, next) => {
    let isAuth = await authManager.isTokenValidAsync(req.headers.token, 1)
    if (!isAuth) {
        return res.status(401).send({'success': false});
    }
    Job.find().exec().then(doc => {
        if (doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({message: 'No valid found for Jobs'});
        }
    })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

/*Service Delete Job*/
router.post('/deletejob', async (req, res, next) => {
    let isAuth = await authManager.isTokenValidAsync(req.headers.token, 5)
    if (!isAuth) {
        return res.status(401).send({'success': false});
    }
    Job.deleteOne({_id: req.body._id})
        .then(result => {
            res.status(200).json({
                message: 'Job deleted'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });

});
/*Service Edit Job :id*/

router.patch('/editjob/:id', async (req, res, next) => {
    let isAuth = await authManager.isTokenValidAsync(req.headers.token, 5);
    if (!isAuth) {
        return res.status(401).send({'success': false});
    }
    const id = req.params.id;
    const updateOpt = {};
    for (const ops of req.body) {
        updateOpt[ops.propName] = ops.value;
    }
    Job.updateOne({_id: id}, {$set: updateOpt})
        .exec().then(result => {
        res.status(200).json({
            message: 'Job updated'
        });
    })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});
module.exports = router;
