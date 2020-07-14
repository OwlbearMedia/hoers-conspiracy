<template>
  <div class="connection" :style="connect"></div>
</template>

<script>
export default {
  name: 'ConspiracyNodeLink',
  props: {
    pointA: {
      type: Object,
      required: true
    },
    pointB: {
      type: Object,
      required: true
    }
  },
  computed: {
    pointAIndex() {
      return this.$store.getters.getNodeIndexById(this.pointA.id);
    },
    pointBIndex() {
      return this.$store.getters.getNodeIndexById(this.pointB.id);
    },
    off1() {
      return {
        top: this.$store.state.nodes[this.pointAIndex].top,
        left: this.$store.state.nodes[this.pointAIndex].left,
      }
    },
    off2() {
      return {
        top: this.$store.state.nodes[this.pointBIndex].top,
        left: this.$store.state.nodes[this.pointBIndex].left,
      }
    },
    connect() {
      const thickness = 4;
      const offset1 = this.pointA.type === 'pin' ? 15 : 75;
      const offset2 = this.pointB.type === 'pin' ? 15 : 75;
      // bottom right
      var x1 = this.off1.left + offset1;
      var y1 = this.off1.top + 10;
      // top right
      var x2 = this.off2.left + offset2;
      var y2 = this.off2.top + 10;
      // distance
      var length = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
      // center
      var cx = (x1 + x2) / 2 - length / 2;
      var cy = (y1 + y2) / 2 - thickness / 2;
      // angle
      var angle = Math.atan2(y1 - y2, x1 - x2) * (180 / Math.PI);

      return {
        '--height': `${thickness}px`,
        '--left': `${cx}px`,
        '--top': `${cy}px`,
        '--width': `${length}px`,
        '--rotation': `rotate(${angle}deg)`,
      };
    }
  }
};
</script>

<style scoped>
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
}
</style>