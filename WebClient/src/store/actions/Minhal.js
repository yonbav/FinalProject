import {    
    ADD_MINHAL_SUCCESS,
    EDIT_MINHAL_SUCCESS,
    GET_ALL_MINHALS_SUCCESS,
    DELETE_MINHAL_SUCCESS,
} from '../actionTypes';

export const deleteMinhalSuccess = (minhalId) => {
    return {
        type: DELETE_MINHAL_SUCCESS,
        minhalId,
    };
};

export const addMinhalSuccess = (newMinhal) => {
    
    return {
        type: ADD_MINHAL_SUCCESS, 
        newMinhal,
    };
};

export const editMinhalSuccess = (editedMinhal) => {
    return {
        type: EDIT_MINHAL_SUCCESS,
        editedMinhal,
    };
};

export const getAllMinhalsSuccess = (allMinhals) => {
    return {
        type: GET_ALL_MINHALS_SUCCESS, 
        allMinhals,
    };
};

