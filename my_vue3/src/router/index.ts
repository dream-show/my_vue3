/*
 * @Description:
 * @Author: 谭海军
 * @Date: 2023-05-15 02:44:49
 * @LastEditors: 谭海军
 * @LastEditTime: 2023-05-15 22:10:35
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import TestView from '../views/TestView.vue';
import TestViewTwo from '@/views/TestViewTwo.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/test',
    name: 'test',
    component: TestView
  },
  {
    path: '/testTwo',
    name: 'testTwo',
    component: TestViewTwo
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
