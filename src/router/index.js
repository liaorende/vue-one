import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import ONE from '@/components/ONE'
import ALL from '@/components/ALL'
import ME from '@/components/ME'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '',
      component: index,
      children: [
        {
          path: '',
          redirect: '/ONE'
        },
        {
          path: '/ONE',
          component: ONE
        },
        {
          path: 'ALL',
          component: ALL
        },
        {
          path: 'ME',
          component: ME
        }
      ]
    }
  ]
})
