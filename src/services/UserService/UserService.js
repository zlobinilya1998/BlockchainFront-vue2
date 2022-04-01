import $api from "@/services/Infrastructure/Api";
import AuthService from '@/services/AuthService/AuthService'

export default class UserService {
    static baseUrl = $api.defaults.baseURL + '/user';
    static async register(user){
        const { data } = await $api.post(this.baseUrl + '/register', user);
        const token = AuthService.setToken(data.result);
        return token;
    }
}
