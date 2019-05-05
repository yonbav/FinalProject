import {    
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    ADD_USER_SUCCESS,
    EDIT_USER_SUCCESS,
    GET_ALL_USERS_SUCCESS,
    DELETE_USER_SUCCESS,
} from '../actionTypes';

export const loginSuccess = (user) => {
    return {
        type: LOGIN_SUCCESS, 
        user,
    };
};

export const logoutSuccess = () => {
    return {
        type: LOGOUT_SUCCESS, 
    };
};

export const deleteUserSuccess = (userId) => {
    return {
        type: DELETE_USER_SUCCESS,
        userId,
    };
};

export const addUserSuccess = (newUser) => {
    
    return {
        type: ADD_USER_SUCCESS, 
        newUser,
    };
};

export const editUserSuccess = (editedUser) => {
    return {
        type: EDIT_USER_SUCCESS,
        editedUser,
    };
};

export const getAllUsersSuccess = (allUsers) => {
    return {
        type: GET_ALL_USERS_SUCCESS, 
        allUsers,
    };
};

