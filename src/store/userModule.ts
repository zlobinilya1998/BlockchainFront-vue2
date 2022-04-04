import {ActionContext} from "vuex";
import {RootState} from "@/store";
import {RegisterModel, User} from "@/models/Entities/User";
import UserSerivce from '@/services/UserService/UserService'
import AuthService from "@/services/AuthService/AuthService";

class UserState {
    loading = false;
    user: User | null = null;
    isLoggedIn = false;
}

const userModule = {
    state: new UserState(),
    namespaced: true,
    mutations: {
        setAuthorized(state: UserState, payload: boolean) {
            state.isLoggedIn = payload;
        }
    },
    actions: {
        async login(me: ActionContext<UserState, RootState>, user: User) {
            me.state.loading = true;
            const userInfo = await AuthService.login(user);
            me.state.user = userInfo;
            me.state.loading = false;
            me.state.isLoggedIn = true;
        },
        async register(me: ActionContext<UserState, RootState>, user: RegisterModel) {
            me.state.loading = true;
            const token = await UserSerivce.register(user);
            me.state.loading = false;
            me.state.isLoggedIn = true;
        },
        async logout(me: ActionContext<UserState, RootState>) {
            AuthService.logout();
            me.state.isLoggedIn = false;
        },
    }
}

export default userModule;
