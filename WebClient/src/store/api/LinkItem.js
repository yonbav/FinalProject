import axios from 'axios';
import API_URL from './ApiUrl'

const headers = {
    'Content-Type': 'application/json',
}

export const addLinkItem = async (params, token) => {
    headers.token = token;
    return await axios.post(`${API_URL.ADD_LINK_ITEM}`, params, {headers:headers})
    .then(res => res)
    .catch(error => {throw error.response})
}

export const getAllLinkItems = async (token) => {
    headers.token = token;
    return await axios.get(`${API_URL.GET_ALL_LINK_ITEMS}`, {headers:headers})
    .then(res => res)
    .catch(error => {throw error.response})
}

export const deleteLinkItem = async (params, token) => {
    headers.token = token;
    return await axios.post(`${API_URL.DELETE_LINK_ITEM}`, params, {headers:headers})
    .then(res => res)
    .catch(error => {throw error.response})
}

export const editLinkItem = async (id, params, token) => {
    headers.token = token;
    return await axios.patch(`${API_URL.EDIT_LINK_ITEM}/${id}`, params, {headers:headers})
    .then(res => res)
    .catch(error => {throw error.response})
}