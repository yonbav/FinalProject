
import {
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    ADD_USER_SUCCESS,
    EDIT_USER_SUCCESS,
    GET_ALL_USER_SUCCESS,
    DELETE_USER_SUCCESS
} from '../actionTypes';

export const loginSuccess = (data) => {
    return {
        type: LOGIN_SUCCESS, 
        payload: data,
    };
};

export const logoutSuccess = () => {
    return {
        type: LOGOUT_SUCCESS, 
    };
};

export const deleteUserSuccess = () => {
    return {
        type: DELETE_USER_SUCCESS, 
    };
};

export const addUserSuccess = () => {
    return {
        type: ADD_USER_SUCCESS, 
    };
};

export const editUserSuccess = () => {
    return {
        type: EDIT_USER_SUCCESS, 
    };
};

export const getAllUsersSuccess = () => {
    return {
        type: GET_ALL_USER_SUCCESS, 
    };
};

