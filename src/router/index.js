import { createRouter, createWebHashHistory } from 'vue-router'
import LoginPage from '../components/LoginPage.vue'
import UserCenterPage from '../components/UserCenterPage.vue'
import ProductCenterPage from '../components/ProductCenterPage.vue'
import CalculationPage from '../components/CalculationPage.vue'
import PurchasePlanPage from '../components/PurchasePlanPage.vue'
import TransitionPage from '../components/TransitionPage.vue'
import SciencePopularizationPage from '../components/SciencePopularizationPage.vue'
import CaseSimulationPage from '../components/CaseSimulationPage.vue'
import CaseBaojiaPage from '../components/CaseBaojiaPage.vue'
import CaseFengdingPage from '../components/CaseFengdingPage.vue'
import CaseQujianPage from '../components/CaseQujianPage.vue'
import SuccessPage from '../components/SuccessPage.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/user-center',
    name: 'UserCenter',
    component: UserCenterPage
  },
  {
    path: '/product-center',
    name: 'ProductCenter',
    component: ProductCenterPage
  },
  {
    path: '/calculation',
    name: 'Calculation',
    component: CalculationPage
  },
  {
    path: '/transition',
    name: 'Transition',
    component: TransitionPage
  },
  {
    path: '/purchase-plan',
    name: 'PurchasePlan',
    component: PurchasePlanPage
  },
  {
    path: '/science',
    name: 'Science',
    component: SciencePopularizationPage
  },
  {
    path: '/case-simulation',
    name: 'CaseSimulation',
    component: CaseSimulationPage
  },
  {
    path: '/case-baojia',
    redirect: '/case-simulation?type=baojia'
  },
  {
    path: '/case-fengding',
    redirect: '/case-simulation?type=fengding'
  },
  {
    path: '/case-qujian',
    redirect: '/case-simulation?type=qujian'
  },
  {
    path: '/success',
    name: 'Success',
    component: SuccessPage
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
