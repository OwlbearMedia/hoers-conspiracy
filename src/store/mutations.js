const mutations = {
  moveLead(state, payload) {
    state.leads[payload.id].top = payload.top;
    state.leads[payload.id].left = payload.left;
  }
};

export { mutations };