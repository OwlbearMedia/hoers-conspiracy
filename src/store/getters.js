const getters = {
  getNodeIndexById: (state) => (id) => state.board.nodes.findIndex((node) => node._id === id),
};

export { getters as default };
