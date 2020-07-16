<template>
  <div class="pin" :style="postion" @mouseover="showControls = true" @mouseout="showControls = false">
    <conspiracy-node-move-button
      :showControls="showControls"
      @drag-mouse-down="dragMouseDown">
    </conspiracy-node-move-button>
    <img class="tack" src="../assets/tack.png" alt="tack">
  </div>
</template>

<script>
import { movementMixin } from './movementMixin';
import ConspiracyNodeMoveButton from './ConspiracyNodeMoveButton.vue';

export default {
  name: 'ConspiracyNodeChild',
  components: {
    ConspiracyNodeMoveButton,
  },
  mixins: [movementMixin],
  props: {
    id: {
      type: Number,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      showControls: false,
    };
  },
  computed: {
    nodeData() {
      return this.$store.state.nodes[this.index];
    },
    postion() {
      return {
        '--top': `${this.nodeData.localTop}px`,
        '--left': `${this.nodeData.localLeft}px`,
      };
    },
  },
  methods: {
    moveNode() {
      this.$store.commit('moveChild', {
        index: this.index,
        top: (this.nodeData.top + this.delta.top),
        left: (this.nodeData.left + this.delta.left),
        localTop: (this.nodeData.localTop + this.delta.top),
        localLeft: (this.nodeData.localLeft + this.delta.left),
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.pin {
  position: absolute;
  top: var(--top);
  left: var(--left);
  width: 30px;
  height: 30px;

  .tack {
    width: 27px;
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 300;
  }
}

.move-me {
  top: 0;
  right: 0;
  opacity: 1;
}
</style>