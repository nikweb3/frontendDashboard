import { createRouter, createWebHistory } from 'vue-router'
import Home from '../view/Home.vue'
import Experience from '../view/Experience.vue'
import Sustainability from '../view/Sustainability.vue'
import Compliance from '../view/Compliance.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/experience', component: Experience },
  { path: '/sustainability', component: Sustainability },
  { path: '/compliance', component: Compliance }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router