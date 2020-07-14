<template>
  <div class="map-content">
    <img class="img-for-real" :src="getImgUrl(nodeData.content, 'bar')" alt="">
      <conspiracy-node-child
        v-for="child in childNodes"
        :key="child.id"
        :id="child.id"
        :index="child.index">
      </conspiracy-node-child>
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
    getImgUrl(pet, test) {
      console.log('why am I being called as the mouse moves?', test)
      var images = require.context('../assets/', false, /\.jpg$/)
      return images('./' + pet + ".jpg")
    },
  },
};
</script>

<style lang="scss" scoped>
.img-for-real {
    width: 900px;
  }
</style>