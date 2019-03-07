const mongoose = require('mongoose');


const importantmessageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title:{type:String},
    contect:{type:String},
    readby:[String],
    createdtime:{type:Date,expireAfterSeconds:172800,default: Date.now}
});
importantmessageSchema.index({createdAt: 1},{expireAfterSeconds: 172800});
module.exports = mongoose.model('ImportantMessage',importantmessageSchema);