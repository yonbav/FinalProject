const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstname:{type:String,required:true},
    lastname:{type:String,required:true},
    id:{type:String,required:true},
    password:{type:String,required:true} ,
    birthday:{type:String,required:true},
    authorization:{type:String,required:true},
    email:{type:String},
    gender:{type:String},
    phone_number:{type:String,required:true},
    branch:{type:String}
});

module.exports = mongoose.model('User',userSchema);
