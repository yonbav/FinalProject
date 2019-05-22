import axios from 'axios';
import API_URL from './ApiUrl'

const headers = {
    'Content-Type': 'application/json',
}

export const addJob = async (params, token) => {
    headers.token = token;
    return await axios.post(`${API_URL.ADD_JOB}`, params, {headers:headers})
    .then(res => res)
    .catch(error => {throw error.response.data})
}

export const getAllJobs = async (token) => {
    headers.token = token;
    return await axios.get(`${API_URL.GET_ALL_JOBS}`, {headers:headers})
    .then(res => res)
    .catch(error => {throw error.response.data})
}

export const deleteJob = async (params, token) => {
    headers.token = token;
    return await axios.post(`${API_URL.DELETE_JOB}`, params, {headers:headers})
    .then(res => res)
    .catch(error => {throw error.response.data})
}

export const editJob = async (id, params, token) => {
    headers.token = token;
    return await axios.patch(`${API_URL.EDIT_JOB}/${id}`, params, {headers:headers})
    .then(res => res)
    .catch(error => {throw error.response.data})
}