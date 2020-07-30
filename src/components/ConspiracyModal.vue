<template>
  <div
    id="nodeModal"
    class="dialog"
    :class="{ 'show': isDialogShown }"
    :style="position"
  >
    <div class="header">
      <button
        class="edit"
        @click="edit"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          role="presentation"
          class="cdr-icon_4.0.0 cdr-icon--large_4.0.0"
        >
          <path d="M18.196 3.59l2.174 2.188c.74.745.78 1.93.117 2.72l-.124.136-11.4 11.359-4.741 1.004a1.054 1.054 0 01-1.22-1.092l.012-.122.944-4.827L15.37 3.583a1.993 1.993 0 012.825.007zm-4.488 4.484l-7.905 7.878-.54 2.765 2.71-.575 7.91-7.881-2.175-2.187zm3.072-3.06l-1.649 1.643 2.176 2.186 1.647-1.64-2.174-2.188z" />
        </svg>
      </button>
      <button @click="closeDialog">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          role="presentation"
          class="cdr-icon_4.0.0 cdr-icon--large_4.0.0"
        >
          <path d="M13.415 12.006l5.295-5.292a1 1 0 00-1.414-1.415L12 10.591 6.71 5.296A1 1 0 005.295 6.71l5.292 5.295-5.295 5.292a1 1 0 101.414 1.414l5.295-5.292 5.292 5.295a1 1 0 001.414-1.414l-5.292-5.294z" />
        </svg>
      </button>
    </div>

    <div class="content">
      <conspiracy-modal-person
        v-if="nodeData.type === 'person'"
        :edit-mode="editMode"
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
      editMode: false,
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
    },
    edit() {
      this.editMode = true;
    },
  },
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

    .edit {
      float: left;
      width: 36px;

      svg {
        width: 35px;
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
