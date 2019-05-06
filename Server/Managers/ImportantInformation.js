const Info = require('../models/importantinformation');

module.exports = {
    findFileNameByIdAsync: async(infoId) => {
        var info = await Info.findOne({_id:infoId});        
        return info.image;
    },
    isImportantInfoValid: async(breifinig)  => {
        return true;
    }
}