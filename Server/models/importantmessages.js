const mongoose = require('mongoose');


const importantmessageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title:{type:String},
    contect:{type:String},
    readby:[String],
    createdtime:{type:String}
});
module.exports = mongoose.model('ImportantMessage',importantmessageSchema);