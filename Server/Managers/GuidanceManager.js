const Guidance = require('../models/guidance');

module.exports = {
    findFileNameByIdAsync: async(guidanceId) => {
        var guidance = await Guidance.findOne({_id:guidanceId});        
        return guidance.image;
    }, 
    isDailyGuidanceValid: async(guidance)  => {
        return true;
    }
}