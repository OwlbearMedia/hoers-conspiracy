<template>
  <div
    class="node"
    :class="type"
    :style="stylePostion"
    @dblclick="showDialog(index)"
    @mouseover="showControls = true"
    @mouseout="showControls = false">
    <conspiracy-node-document
      v-if="type === 'document'"
      :index="index"
      :node-data="nodeData"
      :show-controls="showControls"
      @drag-mouse-down="dragMouseDown">
    </conspiracy-node-document>
    <template v-else>
      <div class="header">
        <img v-if="type !== 'map'" class="tack" src="../assets/tack.png" alt="tack">
        <conspiracy-node-move-button
          :showControls="showControls"
          @drag-mouse-down="dragMouseDown">
        </conspiracy-node-move-button>
      </div>
      <div v-if="type === 'note'" class="content">{{ nodeData.title }}</div>
      <img v-if="imgUrl" class="img" :src="imgUrl" alt="">
      <conspiracy-node-map v-if="type === 'map'" :node-data="nodeData" :child-nodes="children"></conspiracy-node-map>
      <div v-if="nodeData.title && type === 'person'" class="title">{{ nodeData.title }}</div>
    </template>
  </div>
</template>

<script>
import { movementMixin } from './movementMixin';
import { modalMixin } from './modalMixin';
import ConspiracyNodeMap from './ConspiracyNodeMap.vue';
import ConspiracyNodeDocument from './ConspiracyNodeDocument.vue';
import ConspiracyNodeMoveButton from './ConspiracyNodeMoveButton.vue';

export default {
  name: 'ConspiracyNode',
  components: {
    ConspiracyNodeMap,
    ConspiracyNodeDocument,
    ConspiracyNodeMoveButton,
  },
  mixins: [movementMixin, modalMixin],
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      showControls: false,
    };
  },
  computed: {
    index() {
      return this.$store.getters.getNodeIndexById(this.id);
    },
    nodeData() {
      return this.$store.state.board.nodes[this.index];
    },
    type() {
      return this.nodeData.type;
    },
    top() {
      return this.nodeData.top;
    },
    left() {
      return this.nodeData.left;
    },
    imgUrl() {
      let src = this.nodeData.image;
      if (src) {
        const images = require.context('../assets/', false, /\.jpg$/)
        src = images(`./${src}`)
      }
      return src;
    },
    children() {
      return this.nodeData.children.map(child => ({
        id: child,
        index: this.$store.getters.getNodeIndexById(child)
      }));
    },
    stylePostion() {
      return {
        '--top': `${this.top}px`,
        '--left': `${this.left}px`,
      };
    },
  },
  methods: {
    moveNode() {
      this.$store.commit('moveNodeByIndex', {
        index: this.index,
        top: (this.$el.offsetTop + this.delta.top),
        left: (this.$el.offsetLeft + this.delta.left),
      });

      this.updateChildren();
    },
    updateChildren() {
      if (this.children.length) {
        this.children.forEach(child => {
          this.$store.commit('moveChildLinkPosition', {
            index: child.index,
            top: (this.$store.state.board.nodes[child.index].top + this.delta.top),
            left: (this.$store.state.board.nodes[child.index].left + this.delta.left),
          });
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.node {
  position: absolute;
  top: var(--top);
  left: var(--left);
  filter: drop-shadow(3px 3px 3px rgb(0, 0, 0, 0.6));
}

.header {
  text-align: right;
  padding: 5px;
  height: 20px;
}

.person {
  background-color: #f5f2d0;
  padding: 0px 10px 25px 15px;
  filter: drop-shadow(3px 3px 3px rgb(0, 0, 0, 0.6));
  
  .img {
    width: 150px;
    transform: rotate(-1deg);
  }
}

.title {
  position: absolute;
  bottom: 5px;
  background-color: #FDF799;
  padding: 5px;
  filter: drop-shadow(3px 3px 3px rgb(0, 0, 0, 0.1));
  font-family: ShadowsIntoLight, Avenir, Helvetica, Arial, sans-serif;
  width: 80px;
  height: 30px;
  right: 25px;
  transform: rotate(1deg);
}

.note {
  position: absolute;
  top: var(--top);
  left: var(--left);
  background-color: #FDF799;
  width: 150px;
  height: 150px;
  display: grid;
  grid-template-rows: 20% 80%;

  .content {
    padding: 5px 20px 20px 20px;
    font-family: ShadowsIntoLight, Avenir, Helvetica, Arial, sans-serif;
    font-size: 20px;
  }
}

.tack {
  width: 27px;
  position: absolute;
  top: 3px;
  left: 57px;
  z-index: 300;
}

.map .move-me {
  top: 35px;
  opacity: 1;
}

.map .map-content .move-me {
  top: 0px;
  opacity: 1;
}
</style>
