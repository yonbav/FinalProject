import {    
    EDIT_IMPORTANT_INFO_SUCCESS,
    GET_ALL_IMPORTANT_INFO_SUCCESS,
} from '../actionTypes';

export const editImportantInfoSuccess = (editedInfo) => {
    return {
        type: EDIT_IMPORTANT_INFO_SUCCESS, 
        editedInfo,
    };
};

export const getAllImportantInfoSuccess = (allInfo) => {
    return {
        type: GET_ALL_IMPORTANT_INFO_SUCCESS, 
        allInfo,
    };
};

