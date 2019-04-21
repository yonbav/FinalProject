const mongoose = require('mongoose');


const NotificationsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
        id:{type:String},
});
module.exports = mongoose.model('Notifications',NotificationsSchema);
