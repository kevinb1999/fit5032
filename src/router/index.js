import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import AccessDenied from '../views/AccessDenied.vue'
import FirebaseSigninView from '@/views/FirebaseSigninView.vue'
import FirebaseRegisterView from '@/views/FirebaseRegisterView.vue'
import { signOut } from 'firebase/auth'
import { auth } from '@/firebase/init'
import AddBookView from '@/views/AddBookView.vue'
import WeatherView from '@/views/WeatherView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: { requiresAdmin: true }
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    meta: { requiresAuth: true }
  },
  {
    path: '/addbook',
    name: 'AddBook',
    component: AddBookView
  },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/logout', name: 'Logout', component: LoginView },
  { path: '/access-denied', name: 'AccessDenied', component: AccessDenied },
  { path: '/FireLogin', name: 'FireLogin', component: FirebaseSigninView },
  { path: '/FireRegister', name: 'FireRegister', component: FirebaseRegisterView },
  { path: '/WeatherCheck', name: 'WeatherCheck', component: WeatherView  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = sessionStorage.getItem('authenticated') === 'true'
  const role = sessionStorage.getItem('userRole')
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/access-denied')
  } else if (to.path === '/logout') {
    signOut(auth)
      .then(() => {
        console.log('User signed out successfully')
        sessionStorage.clear()
      })
      .catch((err) => {
        console.log('Error signing out')
        console.log(err)
      })

    next('/login')
  } else if (to.meta.requiresAdmin && role !== 'admin') {
    next('/access-denied')
  } else {
    next()
  }
})

export default router
