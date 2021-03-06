<template>
  <div
    :style="stylePostion"
    class="node-container"
  >
    <div
      v-if="isLinking && type !== 'map'"
      class="link"
      :class="cssClass"
    />
    <div
      class="node"
      :class="cssClass"
      @click="createLink"
      @dblclick="showDialog(index)"
      @mouseover="showControls = true"
      @mouseout="showControls = false"
    >
      <conspiracy-node-document
        v-if="type === 'document'"
        :index="index"
        :node-data="nodeData"
        :show-controls="showControls"
        @drag-mouse-down="dragMouseDown"
      />
      <template v-else>
        <div class="header">
          <img
            v-if="type !== 'map'"
            class="tack"
            src="../assets/tack.png"
            alt="tack"
          >
          <conspiracy-node-move-button
            :show-controls="showControls"
            @drag-mouse-down="dragMouseDown"
          />
        </div>
        <div
          v-if="type === 'note'"
          class="content"
        >
          {{ nodeData.title }}
        </div>
        <img
          v-if="imgUrl"
          class="img"
          :src="imgUrl"
          alt=""
        >
        <conspiracy-node-map
          v-if="type === 'map'"
          :node-data="nodeData"
          :child-nodes="children"
        />
        <div
          v-if="nodeData.title && type === 'person'"
          class="title"
        >
          {{ nodeData.title }}
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import movementMixin from './movementMixin';
import modalMixin from './modalMixin';
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
    socket: {
      type: Object,
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
        const images = require.context('../assets/', false, /\.jpg$/);
        src = images(`./${src}`);
      }
      return src;
    },
    children() {
      return this.nodeData.children.map((child) => ({
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
    isLinking() {
      return this.$store.state.isLinking;
    },
    isLinked() {
      return this.$store.state.newLink.pointA === this.id;
    },
    cssClass() {
      return {
        linked: this.isLinked,
        linking: this.isLinking,
        map: this.type === 'map',
        note: this.type === 'note',
        person: this.type === 'person',
        document: this.type === 'document',
      };
    },
  },
  methods: {
    createLink() {
      if (this.isLinking && this.type !== 'map') {
        if (!this.$store.state.newLink.pointA) this.$store.commit('setPointA', this.id);
        else if (!this.$store.state.newLink.pointB) this.$store.commit('setPointB', this.id);
      }
    },
    moveNode() {
      const payload = {
        index: this.index,
        top: (this.$el.offsetTop + this.delta.top),
        left: (this.$el.offsetLeft + this.delta.left),
      };

      this.$store.commit('moveNodeByIndex', payload);
      this.socket.emit('moveNode', payload);
      this.updateChildren();
    },
    updateChildren() {
      if (this.children.length) {
        this.children.forEach((child) => {
          const payload = {
            index: child.index,
            top: (this.$store.state.board.nodes[child.index].top + this.delta.top),
            left: (this.$store.state.board.nodes[child.index].left + this.delta.left),
          };

          this.socket.emit('moveChildNode', payload);
          this.$store.commit('moveChildLinkPosition', payload);
        });
      }
    },
  },
};

</script>

<style lang="scss" scoped>
.node-container {
  position: absolute;
  top: var(--top);
  left: var(--left);

  .link {
    position: absolute;
    top: -5px;
    left: -5px;
    width: 160px;
    height: 160px;
    background-color: dodgerblue;
    opacity: .75;

    &.person {
      width: 185px;
      height: 252.53px;
    }

    &.document {
      width: 360px;
      height: 237px;
      transform: rotate(3deg);
    }

    &.linked {
      background-color: red;
    }
  }

  .node {
    filter: drop-shadow(3px 3px 3px rgb(0, 0, 0, 0.6));

    &.linking {
      cursor: pointer;
    }

    &.note {
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

    &.person {
      background-color: #f5f2d0;
      padding: 0px 10px 25px 15px;
      filter: drop-shadow(3px 3px 3px rgb(0, 0, 0, 0.6));

      .img {
        width: 150px;
        transform: rotate(-1deg);
      }
    }
  }
}

.header {
  text-align: right;
  padding: 5px;
  height: 20px;
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
