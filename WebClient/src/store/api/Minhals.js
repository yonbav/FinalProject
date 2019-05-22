import axios from 'axios';
import API_URL from './ApiUrl'

const headers = {
    'Content-Type': 'application/json'
}

const formHeaders = {
    'Content-Type': 'application/x-www-form-urlencoded'
}

export const addMinhal = async (formData, token) => {
    formHeaders.token = token;
    return await axios.post(`${API_URL.ADD_MINHAL}`, formData, {headers:formHeaders})
    .then(res => res)
    .catch(error => {throw error.response.data})
}

export const getAllMinhals = async (token) => {
    headers.token = token;
    return await axios.get(`${API_URL.GET_ALL_MINHALS}`, {headers:headers})
    .then(res => res)
    .catch(error => {throw error.response.data})
}

export const deleteMinhal = async (params, token) => {
    headers.token = token;
    return await axios.post(`${API_URL.DELETE_MINHAL}`, params, {headers:headers})
    .then(res => res)
    .catch(error => {throw error.response.data})
}

export const editMinhal = async (id, formData, token) => {
    formHeaders.token = token;
    return await axios.post(`${API_URL.EDIT_MINHAL}/${id}`, formData, {headers:formHeaders})
    .then(res => res)
    .catch(error => {throw error.response.data})
}