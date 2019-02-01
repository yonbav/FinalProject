
var express = require('express');
var app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const router = express.Router();
var jsonParser = bodyParser.json()




router.post('/',jsonParser,(req,res,next) => {
    var user=null;
    var email = req.body.email;
    var password = req.body.password;
    var bool = false;
    var MongoClient = require('mongodb').MongoClient;
    if (MongoClient != null && MongoClient != undefined) {
// Connect to the db
            MongoClient.connect("mongodb://localhost:27017/kra", {useNewUrlParser: true}, function (err, db) {
                console.log("connected");

                var dbo = db.db("kra");
                var myobj = {email, password};
                    dbo.collection("users").findOne(req.body, function (err, result) {
                    if (err) throw err;
                    if (result) {
                        bool = true;
                        user= result;
                        console.log("1 document exist");
                        db.close();
                    }
                    console.log(user);
                    res.send({'success': bool,'user': user});

                    });
            });


    }
});
router.get('/',(req,res,next) => {
    res.status(200).json({
        message:'get_birthdays GET works!'
    });
});


module.exports = router;