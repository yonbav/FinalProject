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

export const deleteUser = (userId, token) => {
    return {
        type: DELETE_USER,
        userId,
        token,       
    };
}
export const deleteUserSuccess = (userId) => {
    return {
        type: DELETE_USER_SUCCESS,
        userId,
    };
};

// Add user

export const addUser = (newUser, token) => {
    return {
        type: ADD_USER, 
        newUser,
        token,
    };
};
export const addUserSuccess = (newUser) => {
    
    return {
        type: ADD_USER_SUCCESS, 
        newUser,
    };
};

// Edit user

export const editUser = (editedUser, token) => {
    return {
        type: EDIT_USER, 
        editedUser,
        token,
    };
};

export const editUserSuccess = (editedUser) => {
    return {
        type: EDIT_USER_SUCCESS,
        editedUser,
    };
};

// Get all users

export const getAllUsers = (token) => {
    return {
        type: GET_ALL_USERS,
        token
    };
};

export const getAllUsersSuccess = (allUsers) => {
    return {
        type: GET_ALL_USERS_SUCCESS, 
        allUsers,
    };
};

