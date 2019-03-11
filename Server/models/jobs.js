const mongoose = require('mongoose');


const jobsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title:{type:String},
    number: {type:Number}
});
module.exports = mongoose.model('jobs',jobsSchema);
