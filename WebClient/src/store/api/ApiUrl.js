import {Constants} from '../../Common';

export default {

    // login
    LOGIN: `${Constants.SERVER_URL}/Auth/login`,
    // logout
    LOGOUT: `${Constants.SERVER_URL}/Auth/logout`,
    // check token
    CHECK_TOKEN: `${Constants.SERVER_URL}/Auth/checkToken`,

    /// user ///
    
    // Add a user
    ADD_USER: `${Constants.SERVER_URL}/user/addUser`,
    // Edit a user
    EDIT_USER: `${Constants.SERVER_URL}/user/edituser`,
    // Delete a user
    DELETE_USER: `${Constants.SERVER_URL}/user/deleteUser`,
    // Get all users
    GET_ALL_USERS: `${Constants.SERVER_URL}/user`,

    /// important message ///

    // Add an important message
    ADD_IMPORTANT_MESSAGE: `${Constants.SERVER_URL}/message/addMessage`,
    // Edit an important message
    EDIT_IMPORTANT_MESSAGE: `${Constants.SERVER_URL}/message/editMessage`,
    // Delete an important message
    DELETE_IMPORTANT_MESSAGE: `${Constants.SERVER_URL}/message/deleteMessage`,
    // Get all important messages
    GET_ALL_IMPORTANT_MESSAGES: `${Constants.SERVER_URL}/message/`,

    /// link item ///

    // Add a link item
    ADD_LINK_ITEM: `${Constants.SERVER_URL}/link/addLink`,
    // Edit a link item
    EDIT_LINK_ITEM: `${Constants.SERVER_URL}/link/editLink`,
    // Delete a link item
    DELETE_LINK_ITEM: `${Constants.SERVER_URL}/link/deleteLink`,
    // Get all link items
    GET_ALL_LINK_ITEMS: `${Constants.SERVER_URL}/link/`,

    /// important info ///

    // Edit an important info
    EDIT_IMPORTANT_INFO: `${Constants.SERVER_URL}/info/editInfo`,
    // Get all important info files
    GET_ALL_IMPORTANT_INFO: `${Constants.SERVER_URL}/info/`,

    /// daily briefing ///

    // Add an daily briefing
    ADD_DAILY_BRIEFING: `${Constants.SERVER_URL}/daily/addDailyBrief`,
    // Edit an daily briefing
    EDIT_DAILY_BRIEFING: `${Constants.SERVER_URL}/daily/editDailyBrief`,
    // Delete an daily briefing
    DELETE_DAILY_BRIEFING: `${Constants.SERVER_URL}/daily/deleteDailyBrief`,
    // Get all daily briefing
    GET_ALL_DAILY_BRIEFINGS: `${Constants.SERVER_URL}/daily/`,
}

