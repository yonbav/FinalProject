import {    
    ADD_IMPORTANT_MESSAGE,
    ADD_IMPORTANT_MESSAGE_SUCCESS,
    EDIT_IMPORTANT_MESSAGE,
    EDIT_IMPORTANT_MESSAGE_SUCCESS,
    GET_ALL_IMPORTANT_MESSAGES,
    GET_ALL_IMPORTANT_MESSAGES_SUCCESS,
    DELETE_IMPORTANT_MESSAGE,
    DELETE_IMPORTANT_MESSAGE_SUCCESS,
} from '../actionTypes';

// Add important message

export const addImportantMessage = (newMessage) => {
    return {
        type: ADD_IMPORTANT_MESSAGE, 
        newMessage,
    };
};
export const addImportantMessageSuccess = (newMessage) => {
    
    return {
        type: ADD_IMPORTANT_MESSAGE_SUCCESS, 
        newMessage,
    };
}; 

// Edit important message

export const editImportantMessage = (editedMessage) => {
    return {
        type: EDIT_IMPORTANT_MESSAGE, 
        editedMessage,
    };
};

export const editImportantMessageSuccess = (editedMessage) => {
    return {
        type: EDIT_IMPORTANT_MESSAGE_SUCCESS, 
        editedMessage,
    };
};

// Get all ImportantMessages

export const getAllImportantMessages = () => {
    return {
        type: GET_ALL_IMPORTANT_MESSAGES
    };
};

export const getAllImportantMessagesSuccess = (allMessages) => {
    return {
        type: GET_ALL_IMPORTANT_MESSAGES_SUCCESS, 
        allMessages,
    };
};

// Delete important message

export const deleteImportantMessage = (messageId) => {
    return {
        type: DELETE_IMPORTANT_MESSAGE,
        messageId,
    };
}
export const deleteImportantMessageSuccess = (messageId) => {
    return {
        type: DELETE_IMPORTANT_MESSAGE_SUCCESS,
        messageId,
    };
};

