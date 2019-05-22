const Minhal = require('../models/Minhal');

module.exports = {
    findFileNameByIdAsync: async(minhalId) => {
        var minhal = await Minhal.findOne({_id:minhalId});        
        return minhal.image;
    },
    isDailyMinhalValid: async(minhal)  => {
        return true;
    }
}