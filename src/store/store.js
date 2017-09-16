import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


export const store = new Vuex.Store({
  state:{
    usern: '',
    poll: {},
    ids: []
  },
  getters: {
    ids: state => {
      return state.ids;
    }
  },
  mutations: {
    ids: state => {
      state.ids = Object.getOwnPropertyNames(state.poll);
    }
  },

})

window.store = store;
