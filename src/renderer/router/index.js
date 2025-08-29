import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  // {
  //   path: '/',
  //   name: 'landing-page',
  //   component: require('@/components/LandingPage').default
  // },
  {
    path: '/',
    name: 'canvas-page',
    component: require('@/components/CanvasPage').default
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

export default createRouter({
  history: createWebHashHistory(),
  routes
})
