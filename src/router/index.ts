import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import AuthService from "@/services/AuthService/AuthService";

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginScreen.vue')
  },
  {
    path: '/currency',
    name: 'currency',
    component: () => import('@/views/SymbolsScreen.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from,next) => {
  const authorized = AuthService.isAuthenticated();

  if (!authorized && to.path !== '/login') next('/login')
  else next();
})


export default router
