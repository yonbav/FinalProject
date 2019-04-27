import {    
    EDIT_IMPORTANT_INFO,
    EDIT_IMPORTANT_INFO_SUCCESS,
    GET_ALL_IMPORTANT_INFO,
    GET_ALL_IMPORTANT_INFO_SUCCESS,
} from '../actionTypes';

// Edit important Info

export const editImportantInfo = (editedInfo) => {
    return {
        type: EDIT_IMPORTANT_INFO, 
        editedInfo,
    };
};

export const editImportantInfoSuccess = (editedInfo) => {
    return {
        type: EDIT_IMPORTANT_INFO_SUCCESS, 
        editedInfo,
    };
};

// Get all ImportantInfo

export const getAllImportantInfo = () => {
    return {
        type: GET_ALL_IMPORTANT_INFO
    };
};

export const getAllImportantInfoSuccess = (allInfo) => {
    return {
        type: GET_ALL_IMPORTANT_INFO_SUCCESS, 
        allInfo,
    };
};

