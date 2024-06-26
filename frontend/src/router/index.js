import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/homeView.vue';
import Login from '../views/loginView.vue';
import Article from '../views/articleView.vue';
import CreateArticle from '../views/createView.vue';
import EditArticle from '../views/editView.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/article/:id', name: 'Article', component: Article },
  { path: '/create', name: 'CreateArticle', component: CreateArticle, meta: { requiresAuth: true } },
  { path: '/edit/:id', name: 'EditArticle', component: EditArticle, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    
    const isLoggedIn = !!localStorage.getItem('user');
    if(!isLoggedIn){
        next('/login');
    } else {
        next();
    }
  } else {
    next();
  }
});

export default router;