import axios from 'axios';
import API_URL from './ApiUrl'

const headers = {
    'Content-Type': 'application/json'
}

const formHeaders = {
    'Content-Type': 'application/x-www-form-urlencoded'
}

export const addGuidance = async (formData, token) => {
    formHeaders.token = token;
    return await axios.post(`${API_URL.ADD_GUIDANCE}`, formData, {headers:formHeaders})
    .then(res => res)
    .catch(error => {throw error.response})
}

export const getAllGuidances = async (token) => {
    headers.token = token;
    return await axios.get(`${API_URL.GET_ALL_GUIDANCES}`, {headers:headers})
    .then(res => res)
    .catch(error => {throw error.response})
}

export const deleteGuidance = async (params, token) => {
    headers.token = token;
    return await axios.post(`${API_URL.DELETE_GUIDANCE}`, params, {headers:headers})
    .then(res => res)
    .catch(error => {throw error.response})
}

export const editGuidance = async (id, formData, token) => {
    formHeaders.token = token;
    return await axios.post(`${API_URL.EDIT_GUIDANCE}/${id}`, formData, {headers:formHeaders})
    .then(res => res)
    .catch(error => {throw error.response})
}