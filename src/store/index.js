import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isAntiLinking: false,
    isLinking: false,
    newLink: {
      pointA: null,
      pointB: null,
    },
    isDialogShown: false,
    currentDialog: 0,
    board: null,
  },
  mutations,
  getters,
  actions,
});

export { store as default };
