const modalMixin = {
  methods: {
    showDialog(index) {
      this.$store.commit('showDialog', index);
    }
  }
};

export { modalMixin as default };
