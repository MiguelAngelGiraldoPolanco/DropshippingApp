import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./../views/HomeView.vue'),
    },
    {
      path: '/exploreCOrP',
      name: 'exploreCOrP',
      component: () => import('./../views/ExploreTwoView.vue'),
    },
    {
      path: '/explore',
      name: 'explore',
      component: () => import('./../views/ExploreView.vue'),
    },
    {
      path: '/camera/:id',
      name: 'camera',
      component: () => import('./../views/CameraView.vue'),
    },
    {
      path: '/privacy-policy',
      name: 'privacy-policy',
      component: () => import('../views/PrivacyPolicy.vue'), 
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginClerkView.vue'), 
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'), 
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/CartView.vue'), 
      props: (route) => ({ success: route.query.success }),
    },
    {
      path: '/categories/:id',
      name: 'categories',
      component: () => import('../views/CategoriesView.vue'), 
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/UserView.vue'),
    },
    {
      path: '/pay',
      name: 'pay',
      component: () => import('../views/PayView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
})

export default router
