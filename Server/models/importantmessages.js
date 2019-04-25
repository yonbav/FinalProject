const mongoose = require('mongoose');


const importantmessageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title:{type:String},
    contect:{type:String},
    readby:[String],
    link:{type:String},
    createdtime:{type:String},
    createdAt:{type:Date}
});

module.exports = mongoose.model('ImportantMessage',importantmessageSchema);
