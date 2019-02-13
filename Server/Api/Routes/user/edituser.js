/*const express = require('express');
const bodyParser = require("body-parser");
var app = express();
const router = express.Router();
const User = require('../../../models/user');
app.use(bodyParser.json());

router.patch('/:userID',(req,res,next) => {
    const id = req.params.userID;
    const updateOpt = {};
    for (const ops of req.body){
        updateOpt[ops.propName] = ops.value;
    }
    User.update({_id:id},{$set : updateOpt})
        .select('firstname lastname id _id').exec().then(result=>{
        res.status(200).json({
            message:'User updated'
        });
    })
        .catch(err=> {
            console.log(err);
            res.status(500).json({error:err});
        });
});

*/
