<template>
  <div
    :style="postion"
    class="node-container"
    @click="createLink"
  >
    <div
      v-if="isLinking"
      class="link"
    />
    <div
      class="pin"
      @mouseover="showControls = true"
      @mouseout="showControls = false"
    >
      <conspiracy-node-move-button
        v-if="!isLinking"
        :show-controls="showControls"
        @drag-mouse-down="dragMouseDown"
      />
      <img
        class="tack"
        src="../assets/tack.png"
        alt="tack"
      >
    </div>
  </div>
</template>

<script>
import movementMixin from './movementMixin';
import ConspiracyNodeMoveButton from './ConspiracyNodeMoveButton.vue';

export default {
  name: 'ConspiracyNodeChild',
  components: {
    ConspiracyNodeMoveButton,
  },
  mixins: [movementMixin],
  props: {
    id: {
      type: String,
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
      return this.$store.state.board.nodes[this.index];
    },
    postion() {
      return {
        '--top': `${this.nodeData.localTop}px`,
        '--left': `${this.nodeData.localLeft}px`,
      };
    },
    isLinking() {
      return this.$store.state.isLinking;
    },
    isLinked() {
      return this.$store.state.newLink.pointA === this.id;
    },
  },
  methods: {
    createLink() {
      if (this.isLinking) {
        if (!this.$store.state.newLink.pointA) this.$store.commit('setPointA', this.id);
        else if (!this.$store.state.newLink.pointB) this.$store.commit('setPointB', this.id);
      }
    },
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
.link {
  position: absolute;
  top: calc(var(--top) - 5px);
  left: calc(var(--left) + 5px);
  width: 30px;
  height: 30px;
  background-color: dodgerblue;
  opacity: .75;

  &.linked {
    background-color: red;
  }
}

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
