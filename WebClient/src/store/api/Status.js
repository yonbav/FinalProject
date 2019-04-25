import axios from 'axios';
import API_URL from './ApiUrl'

const headers = {
    'Content-Type': 'application/json',
    'mxauthorization': '',
}

export const getBusinessDay = async () => {
    return await axios.get(`${API_URL.GET_BUSINESS_DAY}`, {headers: headers})
        .then(data => data.data)
        .catch(error => { throw error.response.data });
};

export const getStoreStatus = async () => {
    return await axios.get(`${API_URL.GET_STORE_STATUS}`, {headers: headers})
        .then(data => data.data)
        .catch(error => { throw error.response.data });
};

export const getOpenHours = async () => {
    return await axios.get(`${API_URL.GET_OPEN_HOURS}`, {headers: headers})
        .then(data => data.data)
        .catch(error => { throw error.response.data });
};

export const getStoreName = async () => {
  return await axios.get(`${API_URL.GET_STORE_NAME}`, {headers:headers})
      .then(data => data.data)
      .catch(error => {throw error.response.data})
};

export const getEmployeeCount = async () => {
    return await axios.get(`${API_URL.GET_EMPLOYEE_COUNT}`, {headers: headers})
        .then(data => data.data)
        .catch(error => { throw error.response.data });
};

export const getVersion = async () => {
    return await axios.get(`${API_URL.GET_VERSION}`, {headers: headers})
        .then(data => data.data)
        .catch(error => { throw error.response.data });
};

