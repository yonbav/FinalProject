import axios from 'axios';
import API_URL from './ApiUrl'

const headers = {
    'Content-Type': 'application/json',
}

export const login = async (params) => {
    return await axios.post(`${API_URL.LOGIN}`, params, {headers: headers})
        .then(res => res.data)
        .catch(error => { throw error.response.data });
};

export const addUser = async (params) => {
    return await axios.post(`${API_URL.ADD_USER}`, params, {headers:headers})
    .then(res => res.data)
    .catch(error => {throw error.response.data})
}

export const getAllUsers = async () => {
    return await axios.get(`${API_URL.GET_ALL_USERS}`, {headers:headers})
    .then(res => res.data)
    .catch(error => {throw error.response.data})
}

export const deleteUser = async (params) => {
    return await axios.post(`${API_URL.DELETE_USER}`, params, {headers:headers})
    .then(res => res.data)
    .catch(error => {throw error.response.data})
}

export const editUser = async (id, params) => {
    return await axios.patch(`${API_URL.EDIT_USER}/${id}`, params, {headers:headers})
    .then(res => res.data)
    .catch(error => {throw error.response.data})
}