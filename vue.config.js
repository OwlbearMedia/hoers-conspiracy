module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:1917',
      },
      '/': {
        target: 'ws://localhost:1917',
        ws: true,
      },
    }
  }
};
