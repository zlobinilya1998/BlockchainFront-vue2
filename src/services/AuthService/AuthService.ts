import $api from "@/services/Api";
import {User} from "@/models/Entities/User";

export default class AuthService {
    static baseUrl = $api.defaults.baseURL + '/auth';
    static async login(user: User){
        const { data } = await $api.post(this.baseUrl + '/login', user);
        this.setToken(data.result.token);
        return data.result.userInfo;
    }
    static setToken(token: string){
        localStorage.setItem('token',token);
        return token;
    }
    static isAuthenticated(){
        const token = localStorage.getItem('token');
        return !!token;
    }
    static logout(){
        localStorage.removeItem('token')
    }
}
