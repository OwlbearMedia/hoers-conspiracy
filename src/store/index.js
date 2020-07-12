import Vue from 'vue';
import Vuex from 'vuex';
import { mutations } from './mutations';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    leads: {
      zero: {
        top: 56,
        left: 367,
        type: 'image',
        content: 'map-europe-5'
      },
      one: {
        top: 45,
        left: 47,
        type: 'note',
        content: 'This is a clue'
      },
      two: {
        top: 142,
        left: 165,
        type: 'note',
        content: 'This is a related clue'
      },
      three: {
        top: 315,
        left: 30,
        type: 'note',
        content: 'Yep, another connection'
      },
      four: {
        top: 23,
        left: 584,
        type: 'note',
        content: 'This is a clue unrelated to the others'
      },
      five: {
        top: 516,
        left: 177,
        type: 'person',
        title: 'Vlad III',
        content: 'Vlad-III'
      },
      six: {
        top: 690,
        left: 84,
        type: 'note',
        content: 'I think this dude might be a vampire'
      },
      seven: {
        top: 513,
        left: 827,
        type: 'pin',
        content: 'Rumania'
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
      {
        id: 3,
        pointA: 'seven',
        pointB: 'five'
      },
      {
        id: 4,
        pointA: 'seven',
        pointB: 'two'
      },
    ],
  },
  mutations,
  // actions,
  // getters,
});

export { store };