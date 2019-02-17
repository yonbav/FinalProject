import {
    SHOW_MESSAGE,
    HIDE_MESSAGE,
    ON_SHOW_FULLLOADER,
    ON_HIDE_FULLLOADER,
    SHOW_INDICATOR,
    HIDE_INDICATOR,
    TOGGLE_LOGIN_FORM,
    TOGGLE_BSDATE_FORM,
    TOGGLE_POSCONFIG_FORM,
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

export const showIndicator = () => {
    return {
        type: SHOW_INDICATOR,
    };
};

export const hideIndicator = () => {
    return {
        type: HIDE_INDICATOR,
    };
};

export const toggleLoginForm = () => {
    return {
        type: TOGGLE_LOGIN_FORM,
    };
};

export const toggleBSDateForm = () => {
    return {
        type: TOGGLE_BSDATE_FORM,
    };
};

export const toggleDlg = (data) => {
    return {
        type: TOGGLE_POSCONFIG_FORM,
        payload: data
    };
};

