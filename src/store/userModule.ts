import { ActionContext } from "vuex";
import { RootState } from "@/store/store";
import {RegisterModel, User} from "@/models/Entities/User";
import UserSerivce from '@/services/UserService/UserService'
import AuthService from "@/services/AuthService/AuthService";

class UserState {
    loading: boolean = false;
    user: User | null = null;
    isLoggedIn: boolean = false;
}

const userModule = {
    state: new UserState(),
    actions: {
        async login(me: ActionContext<UserState, RootState>, user: User){
            me.state.loading = true;
            await AuthService.login(user);
            me.state.loading = false;
            me.state.isLoggedIn = true;
        },
        async register(me: ActionContext<UserState, RootState>, user: RegisterModel){
            me.state.loading = true;
            const token = await UserSerivce.register(user);
            me.state.loading = false;
            me.state.isLoggedIn = true;
        },
    }
}

export default userModule;
