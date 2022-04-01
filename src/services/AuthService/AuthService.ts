import $api from "@/services/Infrastructure/Api";
import {User} from "@/models/Entities/User";

export default class AuthService {
    static baseUrl = $api.defaults.baseURL + '/auth';
    static async login(user: User){
        const { data } = await $api.post(this.baseUrl + '/login', user);
        this.setToken(data.result);
    }
    static setToken(token: string){
        localStorage.setItem('token',token);
        return token;
    }
}
