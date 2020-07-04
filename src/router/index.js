import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
	path:'',
	redirect:'/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/systopo',
    name: 'systopo',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/topo/Systopo.vue')
  },
  {
    path: '/nodetopo',
    name: 'nodetopo',
    component: () => import(/* webpackChunkName: "about" */ '../views/topo/Nodetopo.vue')
  },
  {
    path: '/analyze',
    name: 'analyze',
    component: () => import(/* webpackChunkName: "about" */ '../views/analyze/Analyze.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
