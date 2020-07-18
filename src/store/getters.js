const getters = {
  getNodeIndexById: (state) => (id) => {
    return state.board.nodes.findIndex(node => node._id === id)
  }
};

export { getters };