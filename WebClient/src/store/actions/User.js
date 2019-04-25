import {    
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    ADD_USER,
    ADD_USER_SUCCESS,
    EDIT_USER,
    EDIT_USER_SUCCESS,
    GET_ALL_USERS,
    GET_ALL_USERS_SUCCESS,
    DELETE_USER,
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

// Delete user

export const deleteUser = (userId) => {
    return {
        type: DELETE_USER,
        userId,
    };
}
export const deleteUserSuccess = (userId) => {
    return {
        type: DELETE_USER_SUCCESS,
        userId,
    };
};

// Add user

export const addUser = (addedUser) => {
    return {
        type: ADD_USER, 
        addedUser,
    };
};
export const addUserSuccess = (addedUser) => {
    return {
        type: ADD_USER_SUCCESS, 
        addedUser,
    };
};

// Edit user

export const editUser = (userId, editedUser) => {
    return {
        type: EDIT_USER, 
        userId,
        editedUser,
    };
};

export const editUserSuccess = (userId, editedUser) => {
    return {
        type: EDIT_USER_SUCCESS, 
        userId,
        editedUser,
    };
};

// Get all users

export const getAllUsers = () => {
    return {
        type: GET_ALL_USERS
    };
};

export const getAllUsersSuccess = (allUsers) => {
    return {
        type: GET_ALL_USERS_SUCCESS, 
        allUsers,
    };
};

