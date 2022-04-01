import { createStore } from 'vuex'
import blockchainModule from "@/store/blockchainModule";
import userModule from "@/store/userModule";

export class RootState {}


const store = createStore({
    state: new RootState(),
    modules: {
        blockchainModule,
        userModule,
    },
})

export default store;

