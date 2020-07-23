<template>
  <div
    class="board"
    @contextmenu="stopDoingThings"
  >
    <conspiracy-node
      v-for="(node, index) in filteredNodes"
      :id="node._id"
      :socket="socket"
      :key="`node-${index}`"
    />
    <conspiracy-node-link
      v-for="(link, index) in links"
      :key="`link-${index}`"
      :id="link._id"
      :point-a="link.pointA"
      :point-b="link.pointB"
    />

    <div class="frame-top" />
    <div class="frame-bottom" />
    <div class="frame-left" />
    <div class="frame-right" />
    <conspiracy-modal />
    <conspiracy-board-menu />
  </div>
</template>

<script>
import io from 'socket.io-client';
import ConspiracyNode from './ConspiracyNode.vue';
import ConspiracyModal from './ConspiracyModal.vue';
import ConspiracyNodeLink from './ConspiracyNodeLink.vue';
import ConspiracyBoardMenu from './ConspiracyBoardMenu.vue';

export default {
  name: 'ConspiracyBoard',
  components: {
    ConspiracyNode,
    ConspiracyModal,
    ConspiracyNodeLink,
    ConspiracyBoardMenu,
  },
  props: {
    board: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      socket: io('/'),
    };
  },
  created() {
    this.handleMovedNode();
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
  },
  methods: {
    handleMovedNode() {
      this.socket.on('nodeMoved', this.moveNode);
      this.socket.on('childNodeMoved', this.moveChildNode);
    },
    moveNode(payload) {
      this.$store.commit('moveNodeByIndex', payload);
    },
    moveChildNode(payload) {
      this.$store.commit('moveChildLinkPosition', payload);
    },
    stopDoingThings($event) {
      if (this.$store.state.isLinking || this.$store.state.isAntiLinking) {
        $event.preventDefault();
        this.$store.commit('isLinking', false);
        this.$store.commit('isAntiLinking', false);
      }
    },
  },
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
