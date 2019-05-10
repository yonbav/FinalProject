const bodyParser = require("body-parser");
var express = require('express');
const mongoose = require('mongoose');
var app = express();
const router = express.Router();
var jsonParser = bodyParser.json();
app.use(bodyParser.json());
const User = require('../../models/user');
const authManager = require("../../Managers/AuthManager");

/*Service return all the users and there Birthdays*/
router.get('/', async (req, res, next) => {
    try {
        let isAuth = await authManager.isTokenValidAsync(req.headers.token, 1)
        if (!isAuth) {
            return res.status(401).send({ 'success': false });
        }
        User.find().select('firstname lastname birthday').exec().then(docs => {
            res.send(docs)
        })
    }
    catch (err) {
        res.status(500).json({ error: err })
    }
});







module.exports = router;
