import Vue from 'vue';
import Vuex from 'vuex';
import { getters } from './getters';
import { mutations } from './mutations';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    nodes: [
      {
        id: 0,
        top: 56,
        left: 367,
        type: 'map',
        content: 'map-europe-5',
        children: [7],
      },
      {
        id: 1,
        top: 45,
        left: 47,
        type: 'note',
        content: 'This is a clue',
        children: [],
      },
      {
        id: 2,
        top: 142,
        left: 165,
        type: 'note',
        content: 'This is a related clue',
        children: [],
      },
      {
        id: 3,
        top: 315,
        left: 30,
        type: 'note',
        content: 'Yep, another connection',
        children: [],
      },
      {
        id: 4,
        top: 23,
        left: 584,
        type: 'note',
        content: 'This is a clue unrelated to the others',
        children: [],
      },
      {
        id: 6,
        top: 662,
        left: 210,
        type: 'note',
        content: 'I think this dude might be a vampire',
        children: [],
      },
      {
        id: 8,
        top: 703,
        left: 453,
        type: 'handout',
        title: 'Could this be related???',
        content: '',
        image: 'newspaper.jpg',
        children: [],
      },
      {
        id: 5,
        top: 594,
        left: 52,
        type: 'person',
        title: 'Vlad III',
        content: '',
        image: 'Vlad-III.jpg',
        children: [],
      },
      {
        id: 7,
        top: 513,
        left: 827,
        isChild: true,
        localTop: 458,
        localLeft: 456,
        type: 'pin',
        parent: 'zero',
        content: 'Rumania',
      },
    ],
    links: [
      {
        id: 1,
        pointA: {
          id: 1,
          type: 'note'
        },
        pointB: {
          id: 2,
          type: 'note'
        },
      },
      {
        id: 2,
        pointA: {
          id: 2,
          type: 'note'
        },
        pointB:{
          id: 3,
          type: 'note'
        },
      },
      {
        id: 3,
        pointA: {
          id: 7,
          type: 'pin'
        },
        pointB: {
          id: 5,
          type: 'person'
        },
      },
      {
        id: 4,
        pointA: {
          id: 7,
          type: 'pin'
        },
        pointB: {
          id: 2,
          type: 'note'
        },
      },
      {
        id: 5,
        pointA: {
          id: 7,
          type: 'pin'
        },
        pointB: {
          id: 8,
          type: 'handout'
        },
      },
    ],
  },
  mutations,
  getters,
  // actions,
});

export { store };