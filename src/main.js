import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"
import login from './components/login-page.vue'
import SignUp from './components/Sign-up.vue'
import home from './components/home-page.vue'
import VueRouter from 'vue-router'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.config.productionTip = false

const routes = [
  {
    path : '/',
    component : home
  },
  {
    path : '/login',
    component : login
  },
  {
    path : '/signup',
    component : SignUp
  }
]


const router = new VueRouter({
  routes
})


router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');
  if (to.path === '/' && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

new Vue({
  router : router,
  render: h => h(App),
}).$mount('#app')
