const getters = {
  getNodeIndexById: (state) => (id) => {
    return state.nodes.findIndex(node => node.id === id)
  }
};

export { getters };