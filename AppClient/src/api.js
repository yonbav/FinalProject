import axios from 'axios'
import {AsyncStorage} from "react-native";
import API_URL from './apiUrl'
const http =  axios.create({
    baseURL:`${API_URL.SERVER_URL}`,
    'Content-Type': 'application/x-www-form-urlencoded',
    headers: {'Content-Type': 'application/json'},
})
http.interceptors.request.use (
    async function (config) {
        const token = await AsyncStorage.getItem('id_token');
        if (token) config.headers.token = token;
        return config;
    },
    function (error) {
        return Promise.reject (error);
    }
);
export default http;