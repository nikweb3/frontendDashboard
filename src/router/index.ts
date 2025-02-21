import { createRouter, createWebHistory } from 'vue-router'
import Home from '../view/Home.vue'
import Experience from '../view/Experience.vue'
import Sustainability from '../view/Sustainability.vue'
import Compliance from '../view/Compliance.vue'
import ReportBuilder from '../view/ReportBuilder.vue'

const routes = [
  { path: '/', component: Home, meta: { title: 'Home' } },
  { path: '/experience', component: Experience, meta: { title: 'Experience' } },
  { path: '/sustainability', component: Sustainability, meta: { title: 'Sustainability' } },
  { path: '/compliance', component: Compliance, meta: { title: 'Compliance' } },
  { path: '/reportbuilder', component: ReportBuilder, meta: { title: 'Report Builder' } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.afterEach((to) => {
  document.title = `${to.meta.title} - ViadexOne`
})

export default router
