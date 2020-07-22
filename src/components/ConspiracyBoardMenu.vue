<template>
  <div class="menu">
    <button>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        role="presentation"
        class="hamberder cdr-icon_4.0.0 cdr-icon--large_4.0.0"
      >
        <path d="M20 17a1 1 0 010 2H4a1 1 0 010-2h16zm0-6a1 1 0 010 2H4a1 1 0 010-2h16zm0-6a1 1 0 010 2H4a1 1 0 110-2h16z"></path>
      </svg>
    </button>

    <button @click="addLink">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        role="presentation"
        class="cdr-icon_4.0.0 cdr-icon--large_4.0.0"
      >
        <path d="M11 11H6a1 1 0 000 2h5v5a1 1 0 002 0v-5h5a1 1 0 000-2h-5V6a1 1 0 00-2 0v5z"></path>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: 'ConspiracyBoardMenu',
  computed: {
    pointA() {
      return this.$store.state.newLink.pointA;
    },
    pointB() {
      return this.$store.state.newLink.pointB;
    },
  },
  methods: {
    addLink() {
      this.$store.commit('isLinking', true);
    },
  },
  watch: {
    pointA() {
      if (this.pointA && this.pointB) {
        this.$store.commit('createLink', {
          _id: `${this.pointA}${this.pointB}`,
          pointA: this.pointA,
          pointB: this.pointB,
        });
      }
    },
    pointB() {
      if (this.pointA && this.pointB) {
        this.$store.commit('createLink', {
          _id: `${this.pointA}${this.pointB}`,
          pointA: this.pointA,
          pointB: this.pointB,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.menu {
  position: fixed;
  top: 8px;
  right: 8px;
  padding: 4px 4px 0 4px;
  background-color: rgb(0, 0, 0, 0.5);

  button {
    background: none;
    border: none;
    cursor: pointer;
  }

  svg {
    fill: antiquewhite;
    width: 30px;
    height: 30px;
  }
}
</style>
