<template>
  <div :id="id" class="lead" :class="type" :style="postion" @mouseover="showControls = true" @mouseout="showControls = false">
    <div class="header">
      <img v-if="type !== 'map'" class="tack" src="../assets/tack.png" alt="tack">
      <div class="move-me" :class="{ 'show': showControls }" @mousedown="dragMouseDown">
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrows-move" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M6.5 8a.5.5 0 0 0-.5-.5H1.5a.5.5 0 0 0 0 1H6a.5.5 0 0 0 .5-.5z"/>
          <path fill-rule="evenodd" d="M3.854 5.646a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0 0 .708l2 2a.5.5 0 0 0 .708-.708L2.207 8l1.647-1.646a.5.5 0 0 0 0-.708zM9.5 8a.5.5 0 0 1 .5-.5h4.5a.5.5 0 0 1 0 1H10a.5.5 0 0 1-.5-.5z"/>
          <path fill-rule="evenodd" d="M12.146 5.646a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L13.793 8l-1.647-1.646a.5.5 0 0 1 0-.708zM8 9.5a.5.5 0 0 0-.5.5v4.5a.5.5 0 0 0 1 0V10a.5.5 0 0 0-.5-.5z"/>
          <path fill-rule="evenodd" d="M5.646 12.146a.5.5 0 0 0 0 .708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8 13.793l-1.646-1.647a.5.5 0 0 0-.708 0zM8 6.5a.5.5 0 0 1-.5-.5V1.5a.5.5 0 0 1 1 0V6a.5.5 0 0 1-.5.5z"/>
          <path fill-rule="evenodd" d="M5.646 3.854a.5.5 0 0 1 0-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8 2.207 6.354 3.854a.5.5 0 0 1-.708 0z"/>
        </svg>
      </div>
    </div>
    <div v-if="type === 'note'" class="content">{{ content }}</div>
    <img v-if="type === 'person'" class="img" :src="getImgUrl(content)" alt="">
    <div class="map-content" v-if="type === 'map'">
      <img class="img-for-real" :src="getImgUrl(content)" alt="">
      <conspiracy-node v-for="child in children" :key="child" type="pin" :id="child" :ref="child"></conspiracy-node>
    </div>
    <div v-if="title" class="title">{{ title }}</div>
  </div>
</template>

<script>
export default {
  name: 'ConspiracyNode',
  props: {
    id: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      showControls: false,
      pos1: 0,
      pos2: 0,
      pos3: 0,
      pos4: 0,
    }
  },
  computed: {
    data() {
      return this.type === 'pin' ? this.$store.state.pins[this.id] : this.$store.state.nodes[this.type][this.id];
    },
    top() {
      return this.data.top;
    },
    left() {
      return this.data.left;
    },
    title() {
      return this.data.title;
    },
    content() {
      return this.data.content;
    },
    children() {
      return this.data.children;
    },
    postion() {
      return this.type === 'pin' ? {
        '--top': `${this.data.localTop}px`,
        '--left': `${this.data.localLeft}px`,
      } : {
        '--top': `${this.top}px`,
        '--left': `${this.left}px`,
      };
    },
    pins() {
      const pins = [];
      this.children.forEach(child => {
        pins.push(this.$store.state.pins[child]);
      });
      return pins;
    }
  },
  methods: {
    getImgUrl(pet) {
      var images = require.context('../assets/', false, /\.jpg$/)
      return images('./' + pet + ".jpg")
    },
    dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      this.pos3 = e.clientX;
      this.pos4 = e.clientY;

      document.addEventListener('mousemove', this.elementDrag);
      document.addEventListener('mouseup', this.endDrag);
    },
    elementDrag(e) { // This should really be debounced
        e = e || window.event;
        e.preventDefault();
        const el = this.$el;
        // calculate the new cursor position:
        this.pos1 = this.pos3 - e.clientX;
        this.pos2 = this.pos4 - e.clientY;
        this.pos3 = e.clientX;
        this.pos4 = e.clientY;

        if (this.children && this.children.length) {
          const pin = this.$refs.seven[0].$el

          this.$store.commit('movePin', {
            id: 'seven',
            top: (pin.getClientRects()[0].top - 5 - this.pos2),
            left: (pin.getClientRects()[0].left - 5 - this.pos1),
          });
        }

        // set the element's new position:
        if (this.id !== 'seven') {
          this.$store.commit('moveNode', {
            id: this.id,
            type: this.type,
            top: (el.offsetTop - this.pos2),
            left: (el.offsetLeft - this.pos1),
          });
        } else {
          this.$store.commit('movePin', {
            id: this.id,
            top: (this.$el.getClientRects()[0].top - 5 - this.pos2),
            left: (this.$el.getClientRects()[0].left - 5 - this.pos1),
          });

          this.$store.commit('moveChild', {
            id: this.id,
            top: (el.offsetTop - this.pos2),
            left: (el.offsetLeft - this.pos1),
          });
        }
        
    },
    endDrag() {
      document.removeEventListener('mousemove', this.elementDrag);
      document.removeEventListener('mouseup', this.endDrag);
    },
  },
};
</script>

<style lang="scss" scoped>
.lead {
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

.map {
  .img-for-real {
    width: 900px;
  }
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

.pin {
  width: 30px;
  height: 30px;
}

.pin .tack {
  top: 0px;
  left: 0px;
}

.move-me {
  position: absolute;
  text-align: right;
  border: 1px solid black;
  display: inline-block;
  border-radius: 3px;
  height: 17px;
  cursor: move;
  opacity: 0.25;
  visibility: hidden;
  right: 5px;
  top: 5px;
  z-index: 350;
}

.map .move-me {
  top: 35px;
  opacity: 1;
}

.map .map-content .move-me {
  top: 0px;
  opacity: 1;
}

.move-me.show {
  visibility: visible;
}
</style>
