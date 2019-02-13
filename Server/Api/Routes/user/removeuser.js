
const express = require('express');
const bodyParser = require("body-parser");
var app = express();
const router = express.Router();
app.use(bodyParser.json());
const User = require('../../../models/user');

router.delete('/:userID',(req,res,next) => {
    const id = req.params.userID;
    User.remove({_id:id})
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

