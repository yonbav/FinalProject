const User = require('../models/user');
module.exports = {
    isAddUserValidAsync: async (user) => {
        try {
            if (!user.id) {
                return false;
            }

            var user = await User.findOne({ id: user.id });
            if (user) {
                return false;
            }

            return true;
        }
        catch (err) {
            console.log("Error in [isAddUserValidAsync]: " + err);
            return false;
        }
    }
}