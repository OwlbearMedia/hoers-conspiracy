<template>
  <div class="board">
    <lead v-for="(lead, id) in leads" :key="id" :id="id"></lead>
    <connection
      v-for="connection in connections"
      :key="connection.id"
      :pointA="connection.pointA"
      :pointB="connection.pointB">
    </connection>
  </div>
</template>

<script>
import Lead from './Lead.vue';
import Connection from './Connection.vue';

export default {
  name: 'Board',
  components: {
    Lead,
    Connection,
  },
  computed: {
    leads() {
      return this.$store.state.leads;
    },
    connections() {
      return this.$store.state.connections;
    },
  }
};
</script>

<style scoped>
.board {
  width: 1670px;
  height: 856px;
  position: relative;
  border: 5px solid #737e7a;
  background: url(../assets/board.jpg);
}
</style>