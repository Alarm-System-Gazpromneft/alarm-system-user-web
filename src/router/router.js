import Login from '@/pages/LoginPage.vue'; 
import Main from '@/pages/MainPage.vue';
import LK from '@/pages/LKPage.vue';
import { createWebHistory, createRouter } from "vue-router"

const routes=[
  {
    path: '/',
    component:Main,
     meta: {
      title: 'Главная страница'
    }
  },
  {
    path: '/login',
    component: Login,
     meta: {
      title: 'Авторизация'
    }
  },
  {
    path: '/account',
    component: LK,
     meta: {
      title: 'Личный кабинет'
    }
  },
]

const router=createRouter({
  routes,
  history: createWebHistory(import.meta.env.BASE_URL || '/')
})

router.beforeEach((to) => {
  document.title = to.meta?.title || 'Заголовок по умолчанию'
})
export default router;