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
      //state.ids = Object.getOwnPropertyNames(state.poll);
      state.ids = Object.keys(state.poll);
      //state.ids.pop()
      //delete state.poll['__obj__'];
      console.log(state.ids);
    }
  },

})

window.store = store;
