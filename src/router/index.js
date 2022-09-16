import { createRouter, createWebHistory } from 'vue-router'
import useUserStore from '@/stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/RegisterView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/logout',
      name: 'logout',
      beforeEnter: (to, from, next) => {
        useUserStore().clearUser()
        next({ name: 'login' })
      }
    },
    {
      path: '/app',
      name: 'dashboard',
      component: () => import('@/views/Dashboard/IndexView.vue'),
      beforeEnter: (to, from, next) => {
        var userStore = useUserStore()
        if (!!userStore.isLoggedIn) {
          next()
        } else {
          next('/login?next=/app')
        }
      },
      children: [
        {
          path: '',
          name: 'dashboard-home',
          component: () => import('@/views/Dashboard/HomeView.vue')
        },
        {
          path: 'check-in',
          name: 'read-all-check-ins',
          component: () => import('@/views/CheckIn/ReadView.vue')
        },
        {
          path: 'check-in/:id',
          params: { id: Number },
          name: 'read-check-in',
          component: () => import('@/views/CheckIn/ReadView.vue')
        },
        {
          path: 'check-in/new',
          name: 'create-check-in',
          component: () => import('@/views/CheckIn/CreateView.vue')
        },
        {
          path: 'exercises',
          name: 'exercises-home',
          component: () => import('@/views/Exercises/HomeView.vue')
        },
        {
          path: 'exercises/breath',
          name: 'exercises-breath',
          component: () => import('@/views/Exercises/BreathView.vue')
        },
        {
          path: 'exercises/opposites',
          name: 'exercises-opposites',
          component: () => import('@/views/Exercises/OppositesView.vue')
        },
        {
          path: 'journal',
          name: 'journal-home',
          component: () => import('@/views/Journal/HomeView.vue')
        },
        {
          path: 'journal/new',
          name: 'journal-create',
          component: () => import('@/views/Journal/CreateView.vue')
        }
      ]
    }
  ]
})

export default router
