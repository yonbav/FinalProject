import axios from 'axios';
import API_URL from './ApiUrl'

const headers = {
    'Content-Type': 'application/json',
}

const formHeaders = {
    'Content-Type': 'application/x-www-form-urlencoded'
}

export const getAllImportantInfo = async (token) => {
    headers.token = token;
    return await axios.get(`${API_URL.GET_ALL_IMPORTANT_INFO}`, {headers:headers})
    .then(res => res)
    .catch(error => {throw error.response})
}

export const editImportantInfo = async (id, formData, token) => {
    formHeaders.token = token;
    return await axios.post(`${API_URL.EDIT_IMPORTANT_INFO}/${id}`, formData, {headers:formHeaders})
    .then(res => res)
    .catch(error => {throw error.response})
}