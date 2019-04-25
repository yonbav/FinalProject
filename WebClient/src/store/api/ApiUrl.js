import {Constants} from '../../Common';

export default {

    // login
    LOGIN: `${Constants.SERVER_URL}/Auth/Login`,

    /// user ///
    
    // Add a user
    ADD_USER: `${Constants.SERVER_URL}/user/addUser`,
    // Edit a user
    EDIT_USER: `${Constants.SERVER_URL}/user/edituser`,
    // Delete a user
    DELETE_USER: `${Constants.SERVER_URL}/user/deleteUser`,
    // Get all users
    GET_ALL_USER: `${Constants.SERVER_URL}/user`,
}

