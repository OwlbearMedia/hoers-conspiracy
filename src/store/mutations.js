/* eslint-disable no-param-reassign */
import Vue from 'vue';

const mutations = {
  moveNodeByIndex(state, payload) {
    state.board.nodes[payload.index].top = payload.top;
    state.board.nodes[payload.index].left = payload.left;
  },
  moveChildLinkPosition(state, payload) {
    state.board.nodes[payload.index].top = payload.top;
    state.board.nodes[payload.index].left = payload.left;
  },
  moveChild(state, payload) {
    state.board.nodes[payload.index].top = payload.top;
    state.board.nodes[payload.index].left = payload.left;
    state.board.nodes[payload.index].localTop = payload.localTop;
    state.board.nodes[payload.index].localLeft = payload.localLeft;
  },
  showDialog(state, payload) {
    state.currentDialog = payload;
    state.isDialogShown = true;
  },
  closeDialog(state) {
    state.isDialogShown = false;
  },
  setBoard(state, payload) {
    Vue.set(state, 'board', payload);
  },
  isLinking(state, payload) {
    state.newLink.isLinking = payload;
  },
  setPointA(state, payload) {
    state.newLink.pointA = payload;
  },
  setPointB(state, payload) {
    state.newLink.pointB = payload;
  },
  createLink(state, payload) {
    state.board.links.push(payload);
    state.newLink.pointA = null;
    state.newLink.pointB = null;
    state.newLink.isLinking = false;
  }
};

export { mutations as default };
