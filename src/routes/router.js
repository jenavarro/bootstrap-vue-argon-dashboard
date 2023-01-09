import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import { onMounted, ref } from 'vue'
import { supabase } from '../supabase'

Vue.use(VueRouter);
 
onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session
  })

  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session
  })
})
const session = ref() 
 
 
// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: 'active',
  scrollBehavior: (to, from ,savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { selector: to.hash };
    }
    return { x: 0, y: 0 };
  },
  
});
  
router.beforeEach( (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if ( typeof session == 'undefined' || session.value == null) {
      console.log('session.value es nulo, ' + to.fullPath)
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    } else {
      let user = JSON.parse(session.value)
      next() 
      if (to.matched.some(record => record.meta.is_admin)) {
         if (user.is_admin == 1) {
           next()
         } else {
           next({ name: 'userboard' })
         }
       } else {
         next()
       } 
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem('jwt') == null) {
      next()
    } else {
      next({ name: 'userboard' })
    }
  } else {
    next()
  }
})  
 

export default router;
