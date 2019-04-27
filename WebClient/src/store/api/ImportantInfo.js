import axios from 'axios';
import API_URL from './ApiUrl'

const headers = {
    'Content-Type': 'application/json',
}

export const getAllImportantInfo = async () => {
    return await axios.get(`${API_URL.GET_ALL_IMPORTANT_INFO}`, {headers:headers})
    .then(res => res.data)
    .catch(error => {throw error.response.data})
}

export const editImportantInfo = async (id, params) => {
    return await axios.patch(`${API_URL.EDIT_IMPORTANT_INFO}/${id}`, params, {headers:headers})
    .then(res => res.data)
    .catch(error => {throw error.response.data})
}