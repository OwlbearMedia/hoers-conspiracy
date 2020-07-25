<template>
  <div
    class="connection"
    :class="{ highlight: isAntiLinking }"
    :style="connect"
    @click="removeLink"
  />
</template>

<script>
export default {
  name: 'ConspiracyNodeLink',
  props: {
    id: {
      type: String,
      required: true
    },
    pointA: {
      type: String,
      required: true
    },
    pointB: {
      type: String,
      required: true
    },
  },
  computed: {
    isAntiLinking() {
      return this.$store.state.isAntiLinking;
    },
    index() {
      return this.$store.getters.getLinkIndexById(this.id);
    },
    pointAIndex() {
      return this.$store.getters.getNodeIndexById(this.pointA);
    },
    pointBIndex() {
      return this.$store.getters.getNodeIndexById(this.pointB);
    },
    modelA() {
      return {
        top: this.$store.state.board.nodes[this.pointAIndex].top,
        left: this.$store.state.board.nodes[this.pointAIndex].left,
        type: this.$store.state.board.nodes[this.pointAIndex].type,
      };
    },
    modelB() {
      return {
        top: this.$store.state.board.nodes[this.pointBIndex].top,
        left: this.$store.state.board.nodes[this.pointBIndex].left,
        type: this.$store.state.board.nodes[this.pointBIndex].type,
      };
    },
    offset1() {
      if (this.modelA.type === 'pin') {
        return 15;
      } if (this.modelA.type === 'document') {
        return 175;
      }
      return 75;
    },
    offset2() {
      if (this.modelB.type === 'pin') {
        return 15;
      } if (this.modelB.type === 'document') {
        return 175;
      }
      return 75;
    },
    connect() {
      const thickness = 4;
      // bottom right
      const x1 = this.modelA.left + this.offset1;
      const y1 = this.modelA.top + 10;
      // top right
      const x2 = this.modelB.left + this.offset2;
      const y2 = this.modelB.top + 10;
      // distance
      const length = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
      // position
      const left = (x1 + x2) / 2 - length / 2;
      const top = (y1 + y2) / 2 - thickness / 2;
      // angle
      const angle = Math.atan2(y1 - y2, x1 - x2) * (180 / Math.PI);

      return {
        '--height': `${thickness}px`,
        '--left': `${left}px`,
        '--top': `${top}px`,
        '--width': `${length}px`,
        '--rotation': `rotate(${angle}deg)`,
      };
    },
  },
  methods: {
    removeLink() {
      if (this.isAntiLinking) this.$store.commit('removeLink', this.index);
    }
  },
};
</script>

<style lang="scss" scoped>
.connection {
  padding: 0;
  margin: 0;
  position: absolute;
  line-height: 1px;
  background-color: #bf0000;
  border-radius: 4px;
  filter: drop-shadow(2px 2px 2px rgb(0, 0, 0, 0.5));

  height: var(--height);
  left: var(--left);
  top: var(--top);
  width: var(--width);
  transform: var(--rotation);

  &.highlight {
    border: 2px solid dodgerblue;
    cursor: pointer;
  }
}
</style>
