const mutations = {
  moveNode(state, payload) {
    state.nodes[payload.type][payload.id].top = payload.top;
    state.nodes[payload.type][payload.id].left = payload.left;
  },
  movePin(state, payload) {
    state.pins[payload.id].top = payload.top;
    state.pins[payload.id].left = payload.left;
  },
  moveChild(state, payload) {
    state.pins[payload.id].localTop = payload.top;
    state.pins[payload.id].localLeft = payload.left;
  }
};

export { mutations };