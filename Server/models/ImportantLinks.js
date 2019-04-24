const mongoose = require('mongoose');


const ImportantLinks = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title:{type:String},
    url: {type:String}
});
module.exports = mongoose.model('ImportantLinks',ImportantLinks);
