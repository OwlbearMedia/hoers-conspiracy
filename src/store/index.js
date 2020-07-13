import Vue from 'vue';
import Vuex from 'vuex';
import { mutations } from './mutations';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    nodes: {
      map: {
        zero: {
          top: 56,
          left: 367,
          type: 'map',
          content: 'map-europe-5',
          children: ['seven'],
        },
      },
      note: {
        one: {
          top: 45,
          left: 47,
          type: 'note',
          content: 'This is a clue',
          children: [],
        },
        two: {
          top: 142,
          left: 165,
          type: 'note',
          content: 'This is a related clue',
          children: [],
        },
        three: {
          top: 315,
          left: 30,
          type: 'note',
          content: 'Yep, another connection',
          children: [],
        },
        four: {
          top: 23,
          left: 584,
          type: 'note',
          content: 'This is a clue unrelated to the others',
          children: [],
        },
        six: {
          top: 690,
          left: 84,
          type: 'note',
          content: 'I think this dude might be a vampire',
          children: [],
        },
      },
      person: {
        five: {
          top: 516,
          left: 177,
          type: 'person',
          title: 'Vlad III',
          content: 'Vlad-III',
          children: [],
        },
      },
    },
    pins: {
      seven: {
        top: 513,
        left: 827,
        localTop: 458,
        localLeft: 456,
        type: 'pin',
        parent: 'zero',
        content: 'Rumania',
      },
    },
    links: [
      {
        id: 1,
        pointA: {
          id: 'one',
          type: 'note'
        },
        pointB: {
          id: 'two',
          type: 'note'
        },
      },
      {
        id: 2,
        pointA: {
          id: 'two',
          type: 'note'
        },
        pointB:{
          id: 'three',
          type: 'note'
        },
      },
      {
        id: 3,
        pointA: {
          id: 'seven',
          type: 'pin'
        },
        pointB: {
          id: 'five',
          type: 'person'
        },
      },
      {
        id: 4,
        pointA: {
          id: 'seven',
          type: 'pin'
        },
        pointB: {
          id: 'two',
          type: 'note'
        },
      },
    ],
  },
  mutations,
  // actions,
  // getters,
});

export { store };