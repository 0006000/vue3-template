import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login/Index.vue'),
      meta: {
        title: 'login.title',
        keepAlive: false,
        requireAuth: false
      }
    }
  ]
})

export default router