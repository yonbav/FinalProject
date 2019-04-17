import axios from 'axios';
import API_URL from './ApiUrl'

const headers = {
    'Content-Type': 'application/json',
    'mxauthorization': '',
}

export const login = async (params) => {
    return await axios.post(`${API_URL.LOGIN}`, params, {headers: headers})
        .then(data => data.data)
        .catch(error => { throw error.response.data });
};

