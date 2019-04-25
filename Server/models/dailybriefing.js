const mongoose = require('mongoose');


const dailybriefingSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title:{type:String},
    readby:[String],
    image: {type:String},
    createdAt:{type:Date}
});
module.exports = mongoose.model('dailybriefing',dailybriefingSchema);
