const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstname:{type:String},
    lastname:{type:String},
    id:{type:String},
    password:{type:String} ,
    birthday:{type:String},
    authorization:{type:String},
    email:{type:String},
    gender:{type:String},
    phone_number:{type:String},
    branch:{type:String}
});

module.exports = mongoose.model('User',userSchema);
