import Vue from 'vue';
import Vuex from 'vuex';
import { mutations } from './mutations';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    leads: {
      one: {
        top: 50,
        left: 50,
        content: 'This is a clue'
      },
      two: {
        top: 150,
        left: 350,
        content: 'This is a related clue'
      },
      three: {
        top: 75,
        left: 900,
        content: 'This is a clue unrelated to the others'
      },
    },
    connections: [
      {
        id: 1,
        pointA: 'one',
        pointB: 'two'
      }
    ],
  },
  mutations,
  // actions,
  // getters,
});

export { store };