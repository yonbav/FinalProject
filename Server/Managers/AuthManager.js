const User = require('../models/user');

module.exports = {
    /*Checking if the token is valid and if the user has authorization level that is enough*/
    isTokenValidAsync: async (token, authLevel) => {
        try {
            // Checking inf any token was passed
            if (!token) {
                return false;
            }

            // Checking if there is a user with the given token.
            var user = await User.findOne({ token: token });
            if (!user) {
                return false;
            }

            return !authLevel || parseInt(user.authorization) >= authLevel;
        }
        catch (err) {
            console.log("Error in [isTokenValidAsync]: " + err);
            return false;
        }
    }
}