
import {
    GET_ALL_CLIENTS,
    GET_ALL_CLIENTS_SUCCESS,
    LOAD_STORE_DATA,
    LOAD_STORE_DATA_SUCCESS,
    LOAD_POS_CONFIG,
    LOAD_POS_CONFIG_SUCCESS,
    LOG_DISPLAY_PROPERTIES,
    LOG_DISPLAY_PROPERTIES_SUCCESS,
} from '../actionTypes';

export const getAllClient = () => {
    return {
        type: GET_ALL_CLIENTS,
    };
};

export const getAllClientsSuccess = (data) => {
    return {
        type: GET_ALL_CLIENTS_SUCCESS, 
        payload: data,
    };
};

export const loadStoreData = () => {
    return {
        type: LOAD_STORE_DATA,
    };
};

export const loadStoreDataSuccess = (data) => {
    return {
        type: LOAD_STORE_DATA_SUCCESS,
        payload: data,
    };
};

export const loadPosConfig = () => {
    return {
        type: LOAD_POS_CONFIG,
    };
};

export const loadPosConfigSuccess = (data) => {
    return {
        type: LOAD_POS_CONFIG_SUCCESS,
        payload: data,
    };
};

export const logDisplayProperties = () => {
    return {
        type: LOG_DISPLAY_PROPERTIES,
    };
};

export const logDisplayPropertiesSuccess = (data) => {
    return {
        type: LOG_DISPLAY_PROPERTIES_SUCCESS,
        payload: data
    };
};



