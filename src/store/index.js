import Vue from 'vue';
import Vuex from 'vuex';
import VModal from 'vue-js-modal';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);
Vue.use(VModal);

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
