<template>
  <div class="connection" :style="connect"></div>
</template>

<script>
export default {
  name: 'Connection',
  props: {
    pointA: {
      type: String,
      required: true
    },
    pointB: {
      type: String,
      required: true
    }
  },
  computed: {
    off1() {
      return {
        top: this.$store.state.leads[this.pointA].top,
        left: this.$store.state.leads[this.pointA].left,
      }
    },
    off2() {
      return {
        top: this.$store.state.leads[this.pointB].top,
        left: this.$store.state.leads[this.pointB].left,
      }
    },
    getOffset(point) {
      return {
        top: this.$store.state.leads[point].top,
        left: this.$store.state.leads[point].left,
      }
    },
    connect() {
      const thickness = 4;
      // bottom right
      var x1 = this.off1.left + 75;
      var y1 = this.off1.top + 10;
      // top right
      var x2 = this.off2.left + 75;
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

  height: var(--height);
  left: var(--left);
  top: var(--top);
  width: var(--width);
  transform: var(--rotation);
}
</style>