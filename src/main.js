import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue';
import TeamsList from '@/components/teams/TeamsList';
import TeamMembers from '@/components/teams/TeamMembers';
import UsersList from '@/components/users/UsersList';
import RouteNotFound from '@/components/errors/RouteNotFound';
import TeamFooter from '@/components/teams/TeamFooter';
import UserFooter from '@/components/users/UserFooter';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/teams' },
    {
      name: 'teams',
      path: '/teams',
      components: {
        default: TeamsList,
        footer: TeamFooter
      },
      children: [
        { name: 'team-members', path: ':teamId', component: TeamMembers, props: true },
      ]
    },
    {
      path: '/users',
      components: {
        default: UsersList,
        footer: UserFooter
      }
    },
    { path: '/:notFound(.*)', component: RouteNotFound },
  ],
  linkActiveClass: 'active',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { left: 0, top: 0 }
  }
});

const app = createApp(App);

app.use(router);

app.mount('#app');
