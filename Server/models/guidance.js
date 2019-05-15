const mongoose = require('mongoose');


const guidance = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title:{type:String},
    image: {type:String}
});
module.exports = mongoose.model('Guidance',guidance);
