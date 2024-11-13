import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import MyPosts from '@/views/MyPosts.vue'
import ResetPassword from '@/views/ResetPassword.vue'

const routes = [
  { path: '/', component: HomeView },
  { path:'/myPosts', component: MyPosts},
  {path: '/:token', component:ResetPassword}
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

export default router
