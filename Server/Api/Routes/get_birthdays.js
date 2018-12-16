const express =require('express');
var bodyParser = require('body-parser');
const router = express.Router();
express.use(bodyParser.json());

router.post('/',(req,res,next) => {
    var email = req.body.email;
    var password = req.body.password;

    var MongoClient = require('mongodb').MongoClient;

    if (MongoClient != null && MongoClient != undefined) {
// Connect to the db
        MongoClient.connect("mongodb://localhost:27017/kra", {useNewUrlParser: true}, function (err, db) {
            console.log("connected");

            var dbo = db.db("kra");
            var myobj = {email: {email}, pass: {password}};
            dbo.collection("users").insertOne(myobj, function (err, res) {
                if (err) throw err;
                console.log("1 document inserted");
                db.close();
            })


        });
    }
});
router.get('/',(req,res,next) => {
    res.status(200).json({
        message:'get_birthdays GET works!'
    });
});


module.exports = router;