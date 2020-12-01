import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: () => import('../views/About.vue') },
  { path: '/login', name: 'Login', component: () => import('../views/Login.vue') },
  { path: '/goodbye', name: 'GoodBye', component: () => import('../views/GoodBye.vue') },

  { path: '/impostazioni', name: 'Impostazioni', meta: {requiresLogin: true}, component: () => import ('../views/Settings.vue') },
  { path: '/impostazioni/ore', name: 'Ore Settimanali', meta: {requiresLogin: true}, component: () => import ('../views/HoursWeek/lists.vue') },
  { path: '/impostazioni/ore/nuovo', meta: {requiresLogin: true}, component: () => import ('../views/HoursWeek/add.vue') },
  { path: '/impostazioni/ore/:id(\\d+)', meta: {requiresLogin: true}, component: () => import ('../views/HoursWeek/edit.vue') },
  { path: '/impostazioni/giustificativi', name: 'Giustificativi', meta: {requiresLogin: true}, component: () => import('../views/Justification/lists.vue') },
  { path: '/impostazioni/giustificativo/nuovo', meta: {requiresLogin: true}, component: () => import('../views/Justification/add.vue') },
  { path: '/impostazioni/giustificativo/:id(\\d+)', meta: {requiresLogin: true}, component: () => import('../views/Justification/edit.vue') },
  
  { path: '/collaboratori', name: 'Collaboratori', meta: { requiresLogin: true }, component: () => import('../views/Employees/lists.vue') },
  { path: '/collaboratore/nuovo', meta: {requiresLogin: true}, component: () => import('../views/Employees/add.vue') },
  { path: '/collaboratore/:id(\\d+)', meta: {requiresLogin: true}, component: () => import('../views/Employees/profile.vue') },

  { path: '/sedi', name: 'Sedi', meta: {requiresLogin: true}, component: () => import('../views/Offices/lists.vue') },
  { path: '/sede/nuova', meta: {requiresLogin: true}, component: () => import('../views/Offices/add.vue') },
  { path: '/sede/:id(\\d+)', meta: {requiresLogin: true}, component: () => import('../views/Offices/edit.vue') },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  store.commit('initialiseStore')
  const isLoggedIn = store.state.user.isLoggedIn;
  if (to.matched.some(record => record.meta.requiresLogin) && !isLoggedIn) {
    next ({name: 'Login'})
  } else {
    next()
  }
})

export default router
