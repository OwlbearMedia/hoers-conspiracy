<template>
  <div class="hand">
    <img class="tack" src="../assets/tack.png" alt="tack">
    <conspiracy-node-move-button
      :showControls="showControls"
      @drag-mouse-down="$emit('drag-mouse-down', $event)">
    </conspiracy-node-move-button>
    <img v-if="imgUrl" class="img" :src="imgUrl" alt="">
    <div v-if="nodeData.title" class="title">{{ nodeData.title }}</div>
  </div>
</template>

<script>
import ConspiracyNodeMoveButton from './ConspiracyNodeMoveButton.vue';

export default {
  name: 'ConspiracyNodeHandout',
  components: {
    ConspiracyNodeMoveButton,
  },
  props: {
    index: {
      type: Number,
      required: true,
    },
    nodeData: {
      type: Object,
      required: true,
    },
    showControls: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    imgUrl() {
      let src = this.nodeData.image;
      if (src) {
        const images = require.context('../assets/', false, /\.jpg$/)
        src = images(`./${src}`)
      }
      return src;
    },
  }
};
</script>

<style lang="scss" scoped>
.tack {
  width: 27px;
  position: absolute;
  top: 3px;
  left: 155px;
  z-index: 300;
}

.img {
  width: 350px;
  transform: rotate(3deg);
}

.move-me {
  top: 14px;
  right: 0;
  opacity: 1;
}

.title {
  position: absolute;
  font-family: ShadowsIntoLight, Avenir, Helvetica, Arial, sans-serif;
  font-size: 18px;
  bottom: 10px;
  right: 20px;
  background-color: #FDF799;
  filter: drop-shadow(4px 4px 4px rgb(0, 0, 0, 0.2));
  padding: 20px 10px;
}
</style>