<template>
  <div class="board">
    <template v-for="(group, key) in nodes">
      <conspiracy-node v-for="(node, id) in group" :key="id" :type="key" :id="id"></conspiracy-node>
    </template>
    
    <conspiracy-node-link
      v-for="link in links"
      :key="link.id"
      :pointA="link.pointA"
      :pointB="link.pointB">
    </conspiracy-node-link>
  </div>
</template>

<script>
import ConspiracyNode from './ConspiracyNode.vue';
import ConspiracyNodeLink from './ConspiracyNodeLink.vue';

export default {
  name: 'ConspiracyBoard',
  components: {
    ConspiracyNode,
    ConspiracyNodeLink,
  },
  computed: {
    nodes() {
      return this.$store.state.nodes;
    },
    links() {
      return this.$store.state.links;
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