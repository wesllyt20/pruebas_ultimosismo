import Vue from 'vue'
import VueRouter from 'vue-router'
import UltimoSismo from '../components/UltimoSismo.vue'
import MapaFinal from '../components/MapaFinal.vue'
import CrearSismos from '../components/CrearSismos.vue'
import ListarSismos from '../components/ListarSismos.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: UltimoSismo
  },
  {
    path: '/mapafinal/:id',
    name: 'MapaFinal',
    component: MapaFinal
  },
  
  {
    path: '/crearsismos',
    name: 'CrearSismos',
    component: CrearSismos
  },
  {
    path: '/listarsismos',
    name: 'ListarSismos',
    component: ListarSismos
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router