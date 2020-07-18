<template>
  <div id="app">
    <conspiracy-board v-if="board" :board="board" />
  </div>
</template>

<script>
import ConspiracyBoard from './components/ConspiracyBoard.vue';

export default {
  name: 'App',
  components: {
    ConspiracyBoard
  },
  computed: {
    board() {
      return this.$store.state.board;
    }
  },
  created() {
    this.$store.dispatch('getBoard');
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  margin: 0;
}

@font-face {
  font-family: ShadowsIntoLight;
  src: url(./assets/ShadowsIntoLight-Regular.ttf);
}
@font-face {
  font-family: TravelingTypewriter;
  src: url(./assets/TravelingTypewriter.ttf);
}
</style>
