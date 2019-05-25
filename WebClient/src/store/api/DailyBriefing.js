import axios from 'axios';
import API_URL from './ApiUrl'

const headers = {
    'Content-Type': 'application/json'
}

const formHeaders = {
    'Content-Type': 'application/x-www-form-urlencoded'
}

export const addDailyBriefing = async (formData, token) => {
    formHeaders.token = token;
    return await axios.post(`${API_URL.ADD_DAILY_BRIEFING}`, formData, {headers:formHeaders})
    .then(res => res)
    .catch(error => {throw error.response})
}

export const getAllDailyBriefings = async (token) => {
    headers.token = token;
    return await axios.get(`${API_URL.GET_ALL_DAILY_BRIEFINGS}`, {headers:headers})
    .then(res => res)
    .catch(error => {throw error.response})
}

export const deleteDailyBriefing = async (params, token) => {
    headers.token = token;
    return await axios.post(`${API_URL.DELETE_DAILY_BRIEFING}`, params, {headers:headers})
    .then(res => res)
    .catch(error => {throw error.response})
}

export const editDailyBriefing = async (id, formData, token) => {
    formHeaders.token = token;
    return await axios.post(`${API_URL.EDIT_DAILY_BRIEFING}/${id}`, formData, {headers:formHeaders})
    .then(res => res)
    .catch(error => {throw error.response})
}