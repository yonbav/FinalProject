const Briefing = require('../models/dailybriefing');

module.exports = {
    findFileNameByIdAsync: async(briefingId) => {
        var briefing = await Briefing.findOne({_id:briefingId});        
        return briefing.image;
    },
    isDailyBriefingValid: async(breifinig)  => {
        return true;
    }
}