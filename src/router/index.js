import { createRouter, createWebHistory } from 'vue-router'
import CustomerForm from "@/components/CustomerForm/CustomerForm"

const routes = [
  {
    path: '/',
    name: CustomerForm,
    component: CustomerForm
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
