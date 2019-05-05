import {
    ADD_IMPORTANT_MESSAGE_SUCCESS,
    EDIT_IMPORTANT_MESSAGE_SUCCESS,
    GET_ALL_IMPORTANT_MESSAGES_SUCCESS,
    DELETE_IMPORTANT_MESSAGE_SUCCESS,
} from '../actionTypes';

const initState = {
    importantMessagesList:[],
};

export default (state = initState, action) => {
    switch (action.type) {
        case ADD_IMPORTANT_MESSAGE_SUCCESS:
            return {
                ...state,
                importantMessagesList: [...state.importantMessagesList, action.newMessage]
            };
        case DELETE_IMPORTANT_MESSAGE_SUCCESS:
            return {
                ...state,
                importantMessagesList: state.importantMessagesList.filter(message => message._id !== action.messageId)
            };

        case EDIT_IMPORTANT_MESSAGE_SUCCESS:
            return {
                ...state,
                importantMessagesList: state.importantMessagesList.map(message => message._id === action.editedMessage._id ? action.editedMessage : message)
            };

        case GET_ALL_IMPORTANT_MESSAGES_SUCCESS:
            return {
                ...state,
                importantMessagesList: action.allMessages
            };
        default:
            return state;
    }
}