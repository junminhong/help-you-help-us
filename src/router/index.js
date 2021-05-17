import { createRouter, createWebHistory } from 'vue-router'
import CustomerForm from '@/components/CustomerForm/CustomerForm'
import PhoneVerification from '@/components/PhoneVerification/PhoneVerification'
import VerificationSuccess from '@/components/VerificationSuccess/VerificationSuccess'

const routes = [
  {
    path: '/',
    name: CustomerForm,
    component: CustomerForm
  },
  {
    path: '/phone-verification',
    name: PhoneVerification,
    component: PhoneVerification
  },
  {
    path: '/verification-success',
    name: VerificationSuccess,
    component: VerificationSuccess
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
