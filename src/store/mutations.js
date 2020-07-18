/* eslint-disable no-param-reassign */

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
    state.board = payload;
  },
};

export { mutations as default };
