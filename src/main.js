import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue';
import TeamsList from '@/components/teams/TeamsList';
import TeamMembers from '@/components/teams/TeamMembers';
import UsersList from '@/components/users/UsersList';
import RouteNotFound from '@/components/errors/RouteNotFound';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/teams' },
    {
      name: 'teams',
      path: '/teams',
      component: TeamsList,
      children: [
        { name: 'team-members', path: ':teamId', component: TeamMembers, props: true },
      ]
    },
    { path: '/users', component: UsersList },
    { path: '/:notFound(.*)', component: RouteNotFound},
  ],
});

const app = createApp(App);

app.use(router);

app.mount('#app');
