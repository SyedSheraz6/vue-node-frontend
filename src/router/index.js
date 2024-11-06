import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import MyPosts from '@/views/MyPosts.vue'

const routes = [
  { path: '/', component: HomeView },
  { path:'/myPosts', component: MyPosts}
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

export default router
