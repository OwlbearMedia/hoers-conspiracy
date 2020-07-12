import Vue from 'vue';
import Vuex from 'vuex';
import { mutations } from './mutations';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    leads: {
      one: {
        top: 56,
        left: 367,
        content: 'This is a clue'
      },
      two: {
        top: 298,
        left: 210,
        content: 'This is a related clue'
      },
      three: {
        top: 269,
        left: 526,
        content: 'Yep, another connection'
      },
      four: {
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
      },
      {
        id: 1,
        pointA: 'two',
        pointB: 'three'
      },
    ],
  },
  mutations,
  // actions,
  // getters,
});

export { store };