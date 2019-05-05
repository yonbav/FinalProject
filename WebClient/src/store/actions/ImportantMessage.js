import {    
    ADD_IMPORTANT_MESSAGE_SUCCESS,
    EDIT_IMPORTANT_MESSAGE_SUCCESS,
    GET_ALL_IMPORTANT_MESSAGES_SUCCESS,
    DELETE_IMPORTANT_MESSAGE_SUCCESS,
} from '../actionTypes';

export const addImportantMessageSuccess = (newMessage) => {
    
    return {
        type: ADD_IMPORTANT_MESSAGE_SUCCESS, 
        newMessage,
    };
}; 

export const editImportantMessageSuccess = (editedMessage) => {
    return {
        type: EDIT_IMPORTANT_MESSAGE_SUCCESS, 
        editedMessage,
    };
};

export const getAllImportantMessagesSuccess = (allMessages) => {
    return {
        type: GET_ALL_IMPORTANT_MESSAGES_SUCCESS, 
        allMessages,
    };
};

export const deleteImportantMessageSuccess = (messageId) => {
    return {
        type: DELETE_IMPORTANT_MESSAGE_SUCCESS,
        messageId,
    };
};

