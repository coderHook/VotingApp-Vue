import Home from './components/Home.vue';
import NewPoll from './components/NewPoll.vue';
import VotePoll from './components/VotePoll.vue';

export const routes = [
  {path: '/', component: Home},
  {path: '/newPoll', component: NewPoll},
  {path: '/VotePoll/:id', component: VotePoll}
];
