import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/control',
      name: 'control',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/ControlView.vue')
    },
    {
      path: '/companion',
      name: 'companion',
      component: () => import('@/views/CompanionView.vue')
    },
    {
      path: '/companion-register',
      name: 'companion-register',
      component: () => import('@/views/CompanionRegister.vue')
    },
    {
      path: '/companion-register/:id',
      name: 'companion-update',
      component: () => import('@/views/CompanionRegister.vue')
    },
    {
      path: '/music',
      name: 'music',
      component: () => import('@/views/HomeMusic.vue')
    },
    {
      path: '/homecontrol',
      name: 'homecontrol',
      component: () => import('@/views/HomeControl.vue')
    },

  ]
})

export default router
