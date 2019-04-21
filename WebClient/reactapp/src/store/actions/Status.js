
import {
    GET_BUSINESSDAY,
    GET_BUSINESSDAY_SUCCESS,
    GET_STORE_STATUS,
    GET_STORE_STATUS_SUCCESS,
    GET_OPENHOURS,
    GET_OPENHOURS_SUCCESS,
    GET_EMPLOYEECOUNT,
    GET_EMPLOYEECOUNT_SUCCESS,
    GET_STORE_NAME,
    GET_STORE_NAME_SUCCESS,
    GET_VERSION,
    GET_VERSION_SUCCESS,
    SET_POSCONFIGDATE,
    SET_STOREDATA_DATE
} from '../actionTypes';

export const getBusinessDay = () => {
    return {
        type: GET_BUSINESSDAY, 
    };
};

export const getBusinessDaySuccess = (data) => {
    return {
        type: GET_BUSINESSDAY_SUCCESS, 
        payload: data,
    };
};

export const getStoreStatus = () => {
    return {
        type: GET_STORE_STATUS, 
    };
};

export const getStoreStatusSuccess = (data) => {
    return {
        type: GET_STORE_STATUS_SUCCESS,
        payload: data,
    };
};

export const getOpenHours = () => {
    return {
        type: GET_OPENHOURS, 
    };
};

export const getOpenHoursSuccess = (data) => {
    return {
        type: GET_OPENHOURS_SUCCESS, 
        payload: data,
    };
};

export const getEmployeeCount = () => {
    return {
        type: GET_EMPLOYEECOUNT, 
    };
};

export const getEmployeeCountSuccess = (data) => {
    return {
        type: GET_EMPLOYEECOUNT_SUCCESS, 
        payload: data,
    };
};

export const getStoreName = () => {
    return {
        type: GET_STORE_NAME,
    };
};

export const getStoreNameSuccess = (data) => {
    return {
        type: GET_STORE_NAME_SUCCESS,
        payload: data,
    };
};

export const getVersion = () => {
    return {
        type: GET_VERSION, 
    };
};

export const getVersionSuccess = (data) => {
    return {
        type: GET_VERSION_SUCCESS,
        payload: data,
    };
};

export const setPosConfigDate = (data) => {
    return {
        type: SET_POSCONFIGDATE, 
        payload: data,
    };
};

export const setStoreDataDate = (data) => {
    return {
        type: SET_STOREDATA_DATE,
        payload: data,
    };
};
