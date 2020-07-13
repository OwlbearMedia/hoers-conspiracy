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
    <div class="frame-top"></div>
    <div class="frame-bottom"></div>
    <div class="frame-left"></div>
    <div class="frame-right"></div>
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
.frame-top, .frame-bottom, .frame-left, .frame-right {
	background: #737e7a;
	position: fixed;
}
.frame-left, .frame-right {
  top: 0; bottom: 0;
  width: 8px;
}
.frame-left { left: 0; }
.frame-right { right: 0; }
		
.frame-top, .frame-bottom {
  left: 0; right: 0;
  height: 8px;
}
.frame-top { top: 0; }
.frame-bottom { bottom: 0; }

.board {
  width: 10000px;
  height: 10000px;
  position: relative;
  background: url(../assets/board.jpg);
}
</style>