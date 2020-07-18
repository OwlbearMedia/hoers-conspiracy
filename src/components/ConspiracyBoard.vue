<template>
  <div class="board">
    <conspiracy-node
      v-for="(node, index) in filteredNodes"
      :id="node._id"
      :key="`node-${index}`"
    />
    <conspiracy-node-link
      v-for="(link, index) in links"
      :key="`link-${index}`"
      :point-a="link.pointA"
      :point-b="link.pointB"
    />

    <div class="frame-top" />
    <div class="frame-bottom" />
    <div class="frame-left" />
    <div class="frame-right" />
    <conspiracy-modal />
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
  props: {
    board: {
      type: Object,
      required: true,
    },
  },
  computed: {
    nodes() {
      return this.board.nodes || [];
    },
    filteredNodes() {
      return this.nodes.filter((node) => !node.isChild);
    },
    links() {
      return this.board.links || [];
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
