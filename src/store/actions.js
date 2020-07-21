import axios from 'axios';

const actions = {
  async getBoard(context) {
    try {
      const response = await axios.get('/api/boards/5f1235757625c1f0d3215889');
      context.commit('setBoard', response.data);
    } catch (error) {
      console.error(error);
    }
  },
  async updateBoard(context) {
    try {
      const { board } = context.state;
      const response = await axios.put('/api/boards/5f1235757625c1f0d3215889', board);
      context.commit('setBoard', response.data);
    } catch (error) {
      console.error(error);
    }
  },
};

export { actions as default };
