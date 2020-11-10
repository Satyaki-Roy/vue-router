import { createRouter, createWebHistory } from 'vue-router';

import TeamsList from '@/pages/TeamsList';
import TeamMembers from '@/components/teams/TeamMembers';
import UsersList from '@/pages/UsersList';
import RouteNotFound from '@/pages/RouteNotFound';
import TeamFooter from '@/pages/TeamFooter';
import UserFooter from '@/pages/UserFooter';

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
      },
      beforeEnter(to, from, next) {
        console.log('route level beforeEnter');
        next();
      }
    },
    { path: '/:notFound(.*)', component: RouteNotFound },
  ],
  linkActiveClass: 'active',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { left: 0, top: 0 }
  }
});

router.beforeEach((to, from, next) => {
  console.log("Global beforeEach");
  next();
})

router.afterEach(() => {
  console.log('global afterEach');
})

export default router;