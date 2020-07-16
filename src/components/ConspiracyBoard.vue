<template>
  <div class="board">
    <conspiracy-node v-for="(node, index) in filteredNodes" :key="`node-${index}`" :id="node.id"></conspiracy-node>
    <conspiracy-node-link
      v-for="(link, index) in links"
      :key="`link-${index}`"
      :pointA="link.pointA"
      :pointB="link.pointB">
    </conspiracy-node-link>

    <div class="frame-top"></div>
    <div class="frame-bottom"></div>
    <div class="frame-left"></div>
    <div class="frame-right"></div>
    <conspiracy-modal></conspiracy-modal>
  </div>
</template>

<script>
import ConspiracyModal from './ConspiracyModal.vue';
import ConspiracyNode from './ConspiracyNode.vue';
import ConspiracyNodeLink from './ConspiracyNodeLink.vue';

export default {
  name: 'ConspiracyBoard',
  components: {
    ConspiracyModal,
    ConspiracyNode,
    ConspiracyNodeLink,
  },
  computed: {
    nodes() {
      return this.$store.state.nodes;
    },
    filteredNodes() {
      return this.nodes.filter(node => !node.isChild);
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