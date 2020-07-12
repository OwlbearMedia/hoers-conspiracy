<template>
  <div id="app">
    <board></board>
  </div>
</template>

<script>
import Board from './components/Board.vue';

export default {
  name: 'App',
  components: {
    Board
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 30px;
}

@font-face {
  font-family: ShadowsIntoLight;
  src: url(./assets/ShadowsIntoLight-Regular.ttf);
}
</style>
