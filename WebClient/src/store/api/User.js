import axios from 'axios';
import API_URL from './ApiUrl'

const headers = {
    'Content-Type': 'application/json',
}

export const login = async (params) => {
    return await axios.post(`${API_URL.LOGIN}`, params, {headers: headers})
        .then(res => res)
        .catch(error => { throw error.response; });
};

export const logout = async (params) => {
    return await axios.post(`${API_URL.LOGOUT}`, params, {headers: headers})
        .then(res => res)
        .catch(error => { throw error.response; });
};

export const checkToken = async (params) => {
    return await axios.post(`${API_URL.CHECK_TOKEN}`, params, {headers: headers})
        .then(res => res)
        .catch(error => { throw error.response; });
};

export const addUser = async (params, token) => {
    headers.token = token;
    return await axios.post(`${API_URL.ADD_USER}`, params, {headers:headers})
    .then(res => res)
    .catch(error => {throw error.response})
}

export const getAllUsers = async (token) => {
    headers.token = token;
    return await axios.get(`${API_URL.GET_ALL_USERS}`, {headers:headers})
    .then(res => res)
    .catch(error => {throw error.response})
}

export const deleteUser = async (params, token) => {
    headers.token = token;
    return await axios.post(`${API_URL.DELETE_USER}`, params, {headers:headers})
    .then(res => res)
    .catch(error => {throw error.response})
}

export const editUser = async (id, params, token) => {
    headers.token = token;
    return await axios.patch(`${API_URL.EDIT_USER}/${id}`, params, {headers:headers})
    .then(res => res)
    .catch(error => {throw error.response})
}