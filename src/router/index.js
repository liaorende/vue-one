import Vue from 'vue'
import Router from 'vue-router'
import fetch from 'fetch-polyfill'
import ONE from '@/components/ONE'
import ALL from '@/components/ALL'
import ME from '@/components/ME'
import essay from '@/components/essay'
import music from '@/components/music'
import movie from '@/components/movie'
import serial from '@/components/serial/serial'
Vue.use(Router)
Vue.use(fetch)
export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'ONE'
    },
    {
      path: '/ONE',
      component: ONE,
      meta: {
        keepAlive: true
      },
    },
    {
      path: '/ALL',
      component: ALL,
    },
    {
      path: '/ME',
      component: ME,
    },
    {
      path: '/essay',
      component: essay,
    },
    {
      path: '/serial',
      component: serial,
    },
    {
      path: '/music',
      component: music,
    },
    {
      path: '/movie',
      component: movie
    }
  ],
  // scrollBehavior(to, from, savedPosition) {
  //   if (savedPosition) {
  //     return savedPosition
  //   } else {
  //     if (from.meta.keepAlive) {
  //       from.meta.savedPosition = document.body.scrollTop;
  //     }
  //     return { x: 0, y: to.meta.savedPosition || 0 }
  //   }
  // }
})