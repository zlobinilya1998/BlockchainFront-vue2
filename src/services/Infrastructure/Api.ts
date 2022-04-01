import axios from "axios";

const baseURL = process.env.NODE_ENV == 'development' ? 'http://localhost:5000' : 'https://blockchain-backend.vercel.app';

const $api = axios.create({
    baseURL: baseURL + '/api',
})
$api.defaults.timeout = 30_000;
$api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    // @ts-ignore
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config;
})
$api.interceptors.response.use((responce)=>{
    if (responce.status === 401){
        localStorage.removeItem('token');
    }
    return responce;
})

export default $api;
