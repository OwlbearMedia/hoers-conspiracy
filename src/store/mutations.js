const mutations = {
  moveNodeByIndex(state, payload) {
    state.nodes[payload.index].top = payload.top;
    state.nodes[payload.index].left = payload.left;
  },
  moveChildLinkPosition(state, payload) {
    state.nodes[payload.index].top = payload.top;
    state.nodes[payload.index].left = payload.left;
  },
  moveChild(state, payload) {
    state.nodes[payload.index].top = payload.top;
    state.nodes[payload.index].left = payload.left;
    state.nodes[payload.index].localTop = payload.localTop;
    state.nodes[payload.index].localLeft = payload.localLeft;
  },
  setDialog(state, payload) {
    state.currentDialog = payload;
  },
};

export { mutations };