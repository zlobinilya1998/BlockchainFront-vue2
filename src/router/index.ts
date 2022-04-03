import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import AuthService from "@/services/AuthService/AuthService";
import store from "@/store"
Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginScreen.vue')
  },
  {
    path: '/currency',
    name: 'currency',
    component: () => import('@/views/SymbolsScreen.vue'),
    meta: {
      requiresAuth: true,
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from,next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const authorized = AuthService.isAuthenticated();
    if (authorized) return next();
    return next('/login')
  } else return next();
})


export default router
