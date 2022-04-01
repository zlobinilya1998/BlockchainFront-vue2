import Vue from 'vue'
import Vuex from 'vuex'
import blockchainModule from "@/store/blockchainModule";
import userModule from "@/store/userModule";

Vue.use(Vuex)
export class RootState {}

export default new Vuex.Store({
  state: new RootState(),
  modules: {
    blockchainModule,
    userModule,
  },
})
