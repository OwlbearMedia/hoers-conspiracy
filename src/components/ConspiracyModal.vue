<template>
  <div
    id="nodeModal"
    class="dialog"
    :class="{ 'show': isDialogShown }"
    :style="position"
  >
    <div class="header">
      <button @click="closeDialog">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          role="presentation"
          class="cdr-icon_4.0.0 cdr-icon--large_4.0.0"
        ><path d="M13.415 12.006l5.295-5.292a1 1 0 00-1.414-1.415L12 10.591 6.71 5.296A1 1 0 005.295 6.71l5.292 5.295-5.295 5.292a1 1 0 101.414 1.414l5.295-5.292 5.292 5.295a1 1 0 001.414-1.414l-5.292-5.294z" /></svg>
      </button>
    </div>

    <div class="content">
      <conspiracy-modal-person
        v-if="nodeData.type === 'person'"
        :person-data="nodeData"
      />
    </div>
  </div>
</template>

<script>
import ConspiracyModalPerson from './ConspiracyModalPerson.vue';

export default {
  name: 'ConspiracyModal',
  components: {
    ConspiracyModalPerson,
  },
  data() {
    return {
      bg: 885,
      top: 0,
      left: 0,
      width: 900,
      height: 85,
      backgroundPosition: 0,
    };
  },
  computed: {
    isDialogShown() {
      return this.$store.state.isDialogShown;
    },
    currentDialog() {
      return this.$store.state.currentDialog;
    },
    nodeData() {
      return this.$store.state.board.nodes[this.currentDialog];
    },
    position() {
      return {
        '--bg': `${this.bg}px`,
        '--top': `${this.top}px`,
        '--left': `${this.left}px`,
        '--width': `${this.width}px`,
        '--height': `${this.height}vh`,
      };
    }
  },
  watch: {
    isDialogShown() {
      const windowWidth = window.innerWidth;
      const scrollWidth = windowWidth - document.body.offsetWidth;
      const windowHeight = window.innerHeight;

      this.bg = this.width - scrollWidth;
      this.top = (windowHeight * (1 - (this.height / 100)) - scrollWidth) / 2;
      this.left = (windowWidth - this.width - scrollWidth) / 2;
    }
  },
  methods: {
    closeDialog() {
      this.$store.commit('closeDialog');
    }
  }
};
</script>

<style lang="scss" scoped>
.dialog {
  display: none;
  font-family: Verdana, sans-serif;
  overflow: auto;
  position: fixed;
  top: var(--top);
  left: var(--left);
  width: var(--width);
  height: var(--height);
  box-shadow: 0px 0px 20px 5px rgba(0,0,0,0.75);

  &.show {
    display: block;
  }

  .header {
    background-color: #000;
    opacity: 0.5;
    position: fixed;
    height: 40px;
    width: var(--bg);
    text-align: right;
    z-index: 10;

    button {
      background: none;
      color: antiquewhite;
      border: none;
      cursor: pointer;

      svg {
        fill: antiquewhite;
        width: 39px;
      }
    }
  }

  .content {
    overflow: auto;
    font-size: 1em;
    text-align: left;
    color: #666;
    background: url(../assets/poper.jpg);
    background-size: var(--bg);
    background-attachment: local;
  }
}
</style>
