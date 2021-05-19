import { createRouter, createWebHistory } from 'vue-router'
import CustomerForm from '@/components/CustomerForm/CustomerForm'
import PhoneVerification from '@/components/PhoneVerification/PhoneVerification'
import VerificationSuccess from '@/components/VerificationSuccess/VerificationSuccess'
import ShopForm from '@/components/ShopForm/ShopForm'
import ShopQrCode from '@/components/ShopQrCode/ShopQrCode'

const routes = [
  {
    path: '/customer-form',
    name: 'CustomerForm',
    component: CustomerForm
  },
  {
    path: '/customer-form/:shopUid',
    name: 'CustomerForm',
    component: CustomerForm
  },
  {
    path: '/phone-verification',
    name: 'PhoneVerification',
    component: PhoneVerification
  },
  {
    path: '/verification-success',
    name: 'VerificationSuccess',
    component: VerificationSuccess
  },
  {
    path: '/shop-form',
    name: 'ShopForm',
    component: ShopForm
  },
  {
    path: '/shop-qrcode',
    name: 'ShopQrCode',
    component: ShopQrCode
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
