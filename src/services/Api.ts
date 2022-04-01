import axios, {AxiosRequestConfig, AxiosResponse} from "axios";

const baseURL = process.env.NODE_ENV == 'development' ? 'http://localhost:5000' : 'https://blockchain-backend.vercel.app';

const $api = axios.create({
    baseURL: baseURL + '/api',
})
$api.defaults.timeout = 30_000;
$api.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})
$api.interceptors.response.use((response: AxiosResponse)=>{
    if (response.status === 401){
        localStorage.removeItem('token');
    }
    return response;
})

export default $api;
