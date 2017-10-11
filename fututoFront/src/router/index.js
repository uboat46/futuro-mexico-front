import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Perfil from '@/components/Perfil'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/perfil/:id',
      name: 'Perfil',
      component: Perfil
    }
  ]
})
