
import {
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS
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


