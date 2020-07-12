<template>
  <div class="lead" :style="postion" @mouseover="showControls = true" @mouseout="showControls = false">
    <div class="header">
      <img class="tack" src="../assets/tack.png" alt="tack">
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
    <div class="content"><slot></slot></div>
  </div>
</template>

<script>
// import debounce from 'lodash';

export default {
  name: 'Lead',
  props: {
    id: {
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
    top() {
      return this.$store.state.leads[this.id].top;
    },
    left() {
      return this.$store.state.leads[this.id].left;
    },
    postion() {
      return {
        '--top': `${this.top}px`,
        '--left': `${this.left}px`,
      };
    }
  },
  methods: {
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
        // set the element's new position:
        this.$store.commit('moveLead', {
          id: this.id,
          top: (el.offsetTop - this.pos2),
          left: (el.offsetLeft - this.pos1),
        });
    },
    endDrag() {
      document.removeEventListener('mousemove', this.elementDrag);
      document.removeEventListener('mouseup', this.endDrag);
    }
  }
};
</script>

<style scoped>
.lead {
  position: absolute;
  top: var(--top);
  left: var(--left);
  background-color: #FDF799;
  width: 150px;
  height: 150px;
  display: grid;
  grid-template-rows: 20% 80%;
  filter: drop-shadow(3px 3px 3px rgb(0, 0, 0, 0.6));
}
.header {
  text-align: right;
  padding: 5px;
  height: 20px;
}
.tack {
  width: 27px;
  position: absolute;
  top: 3px;
  left: 57px;
  z-index: 300;
}
.content {
  padding: 5px 20px 20px 20px;
  font-family: ShadowsIntoLight, Avenir, Helvetica, Arial, sans-serif;
  font-size: 20px;
}
.move-me {
  text-align: right;
  border: 1px solid black;
  display: inline-block;
  border-radius: 3px;
  height: 17px;
  cursor: move;
  opacity: 0.25;
  visibility: hidden;
}
.move-me.show {
  visibility: visible;
}
</style>