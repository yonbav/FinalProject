import {
    SHOW_MESSAGE,
    HIDE_MESSAGE,
    ON_SHOW_FULLLOADER,
    ON_HIDE_FULLLOADER,
    TOGGLE_LOGIN_FORM,
} from '../actionTypes';

export const showFullLoader = (data) => {
    return {
        type: ON_SHOW_FULLLOADER, 
        payload: data,
    };
};

export const hideFullLoader = () => {
    return {
        type: ON_HIDE_FULLLOADER, 
    };
};

export const showMessage = (message) => {
    return {
        type: SHOW_MESSAGE,
        payload: message
    };
};

export const hideMessage = () => {
    return {
        type: HIDE_MESSAGE,
    };
};

export const toggleLoginForm = () => {
    return {
        type: TOGGLE_LOGIN_FORM,
    };
};

