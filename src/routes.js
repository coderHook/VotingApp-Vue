import Home from './components/Home.vue';
import NewPoll from './components/NewPoll.vue';
import VotePoll from './components/VotePoll.vue';
import Auth from './components/Auth.vue';
import AuthSuccess from './components/AuthSuccess.vue';

export const routes = [
  {path: '/', component: Home},
  {path: '/newPoll', component: NewPoll},
  {path: '/VotePoll/:id', component: VotePoll},
  {path: '/Auth', component: Auth},
  { path: '/success/:user', component: AuthSuccess }

];
