const mongoose = require('mongoose');


const MinhalSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title:{type:String},
    image: {type:String}
});
module.exports = mongoose.model('Minhal',MinhalSchema);
