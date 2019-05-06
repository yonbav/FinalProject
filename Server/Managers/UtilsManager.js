
module.exports = { 
    convertJsonToUpdateOpt(obj) {
        const updateOpt = {};
        Object.keys(obj).forEach((key,index)=> {
            // changingthis values is not allowed
            if (key === "__v" || key === "_id")
                return;

            updateOpt[key] = obj[key];
        });

        return updateOpt;
    }
};