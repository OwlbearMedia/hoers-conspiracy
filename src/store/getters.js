const getters = {
  getNodeIndexById: (state) => (id) => state.board.nodes.findIndex((node) => node._id === id),
  getLinkIndexById: (state) => (id) => state.board.links.findIndex((link) => link._id === id),
};

export { getters as default };
