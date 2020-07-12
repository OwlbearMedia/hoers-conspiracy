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
        type: 'note',
        content: 'This is a clue'
      },
      two: {
        top: 298,
        left: 210,
        type: 'note',
        content: 'This is a related clue'
      },
      three: {
        top: 269,
        left: 526,
        type: 'note',
        content: 'Yep, another connection'
      },
      four: {
        top: 75,
        left: 900,
        type: 'note',
        content: 'This is a clue unrelated to the others'
      },
      five: {
        top: 317,
        left: 850,
        type: 'image',
        title: 'Vlad III',
        content: 'Vlad-III'
      },
      six: {
        top: 502,
        left: 762,
        type: 'note',
        content: 'I think this dude might be a vampire'
      },
    },
    connections: [
      {
        id: 1,
        pointA: 'one',
        pointB: 'two'
      },
      {
        id: 2,
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