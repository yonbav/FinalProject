import axios from 'axios';
import API_URL from './ApiUrl'
// import localStore from 'store';

export const getAllClients = async () => {
    return await axios.get(`${API_URL.GET_ALL_CLIENTS}`)
        .then(data => data.data)
        .catch(error => { throw error.response.data });
};

export const loadStoreData = async () => {
    return await axios.get(`${API_URL.LOAD_STORE_DATA}`)
        .then(data => data.data)
        .catch(error => { throw error.response.data });
};

export const loadPosConfig = async () => {
    return await axios.get(`${API_URL.LOAD_POS_CONFIG}`)
        .then(data => data.data)
        .catch(error => { throw error.response.data });
};

export const getPosConfig = async (params) => {
    return await axios.get(`${API_URL.GET_POS_CONFIG}?id=${params.id}&type=${params.type}`)
        .then(data => data.data)
        .catch(error => { throw error.response.data });
};

export const restartClient = async (params) => {
    return await axios.get(`http://${params.ip}:8080/Restart`)
        .then(data => data.data)
        .catch(error => { throw error.response.data });
};

export const forcePcRestart = async (params) => {
    return await axios.get(`http://${params.ip}:8080/ForcePcRestart`)
        .then(data => data.data)
        .catch(error => { throw error.response.data });
};

export const highAuthOpenDay = async (params) => {
    return await axios.post(`${API_URL.HIGH_AUTh_OPEN_DAY}`, params)
        .then(data => data.data)
        .catch(error => { throw error.response.data });
};

export const startClose = async () => {
    return await axios.post(`${API_URL.START_CLOSE}`)
        .then(data => data.data)
        .catch(error => { throw error.response.data });
};

export const logDisplayProperties = async () => {
    return await axios.get(`${API_URL.LOG_DISPLAY_PROPERTIES}`)
        .then(data => data.data)
        .catch(error => { throw error.response.data });
};