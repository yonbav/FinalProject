const mongoose = require('mongoose');


const importantInformationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title:{type:String},
    image: {type:String},
    displayName: {type:String}
});
module.exports = mongoose.model('ImportantInfo',importantInformationSchema);
