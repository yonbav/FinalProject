import axios from 'axios';
import API_URL from './ApiUrl'

const headers = {
    'Content-Type': 'application/json',
}

export const addDailyBriefing = async (params, token) => {
    headers.token = token;
    return await axios.post(`${API_URL.ADD_DAILY_BRIEFING}`, params, {headers:headers})
    .then(res => res.data)
    .catch(error => {throw error.response.data})
}

export const getAllDailyBriefings = async (token) => {
    headers.token = token;
    return await axios.get(`${API_URL.GET_ALL_DAILY_BRIEFINGS}`, {headers:headers})
    .then(res => res.data)
    .catch(error => {throw error.response.data})
}

export const deleteDailyBriefing = async (params, token) => {
    headers.token = token;
    return await axios.post(`${API_URL.DELETE_DAILY_BRIEFING}`, params, {headers:headers})
    .then(res => res.data)
    .catch(error => {throw error.response.data})
}

export const editDailyBriefing = async (id, params, token) => {
    headers.token = token;
    return await axios.patch(`${API_URL.EDIT_DAILY_BRIEFING}/${id}`, params, {headers:headers})
    .then(res => res.data)
    .catch(error => {throw error.response.data})
}