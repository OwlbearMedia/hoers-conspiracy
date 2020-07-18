<template>
  <div class="map-content">
    <img
      class="img-for-real"
      :src="getImgUrl(nodeData.content)"
      alt=""
    >
    <conspiracy-node-child
      v-for="child in childNodes"
      :id="child.id"
      :key="child.id"
      :index="child.index"
    />
  </div>
</template>

<script>
import ConspiracyNodeChild from './ConspiracyNodeChild.vue';

export default {
  name: 'ConspiracyNodeMap',
  components: {
    ConspiracyNodeChild,
  },
  props: {
    nodeData: {
      type: Object,
      required: true,
    },
    childNodes: {
      type: Array,
      required: true,
    },
  },
  methods: {
    getImgUrl(pet) {
      const images = require.context('../assets/', false, /\.jpg$/);
      return images(`./${pet}.jpg`);
    },
  },
};
</script>

<style lang="scss" scoped>
.img-for-real {
    width: 900px;
  }
</style>
