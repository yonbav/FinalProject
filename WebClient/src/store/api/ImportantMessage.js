import axios from 'axios';
import API_URL from './ApiUrl'

const headers = {
    'Content-Type': 'application/json',
}

export const addImportantMessage = async (params, token) => {
    headers.token = token;
    return await axios.post(`${API_URL.ADD_IMPORTANT_MESSAGE}`, params, {headers:headers})
    .then(res => res)
    .catch(error => {throw error.response})
}

export const getAllImportantMessages = async (token) => {
    headers.token = token;
    return await axios.get(`${API_URL.GET_ALL_IMPORTANT_MESSAGES}`, {headers:headers})
    .then(res => res)
    .catch(error => {throw error.response})
}

export const deleteImportantMessage = async (params, token) => {
    headers.token = token;
    return await axios.post(`${API_URL.DELETE_IMPORTANT_MESSAGE}`, params, {headers:headers})
    .then(res => res)
    .catch(error => {throw error.response})
}

export const editImportantMessage = async (id, params, token) => {
    headers.token = token;
    return await axios.patch(`${API_URL.EDIT_IMPORTANT_MESSAGE}/${id}`, params, {headers:headers})
    .then(res => res)
    .catch(error => {throw error.response})
}