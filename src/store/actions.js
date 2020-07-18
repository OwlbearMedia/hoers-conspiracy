import axios from 'axios';

const actions = {
  async getBoard(context) {
    try {
      const response = await axios.get('/api/boards/5f1235757625c1f0d3215889');
      context.commit('setBoard', response.data);
    } catch (error) {
      console.error(error);
    }
  }
};

export { actions };
