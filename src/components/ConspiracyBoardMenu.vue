<template>
  <div
    ref="menu"
    class="menu"
  >
    <button @click="toggleMenu">
      <svg
        v-if="!isMenuExpanded"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        role="presentation"
        class="hamberder cdr-icon_4.0.0 cdr-icon--large_4.0.0"
      >
        <path d="M20 17a1 1 0 010 2H4a1 1 0 010-2h16zm0-6a1 1 0 010 2H4a1 1 0 010-2h16zm0-6a1 1 0 010 2H4a1 1 0 110-2h16z" />
      </svg>
      <svg
        v-if="isMenuExpanded"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        role="presentation"
        class="cdr-icon_4.0.0 cdr-icon--large_4.0.0"
      >
        <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zM7.293 7.296a1 1 0 000 1.414l3.285 3.295-3.285 3.288a1 1 0 001.414 1.415l3.285-3.289 3.297 3.289a1 1 0 001.414-1.415l-3.297-3.287 3.297-3.296a1 1 0 10-1.414-1.414l-3.297 3.295-3.285-3.295a1 1 0 00-1.414 0z" />
      </svg>
    </button>

    <div
      v-if="isMenuExpanded"
      class="menu-content"
    >
      <div class="section">
        <h3 class="section-header">
          Strings
        </h3>
        <div class="desc">
          The strings that link the conspiracy together
        </div>
        <button @click="addLink">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            role="presentation"
            class="cdr-icon_4.0.0 cdr-icon--large_4.0.0"
          >
            <path d="M11 11H6a1 1 0 000 2h5v5a1 1 0 002 0v-5h5a1 1 0 000-2h-5V6a1 1 0 00-2 0v5z" />
          </svg>
          <span class="btn-text">Add string</span>
        </button>

        <button @click="removeLink">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            role="presentation"
            class="cdr-icon_4.0.0 cdr-icon--large_4.0.0"
          >
            <path d="M17.998 6.004c.557 0 1.01.448 1.01 1l-.003.062-.877 13.998a1.006 1.006 0 01-1.007.938H6.899c-.533 0-.974-.41-1.008-.937L5.002 7.067c-.032-.512.33-.958.827-1.047l.149-.015h12.02zM7.085 8.002l.761 12h8.325l.752-11.998-9.838-.002zm7.332-5.997a1 1 0 01.902.568l.206.429h3.48a1 1 0 01.116 1.994l-.117.006H5.008A1 1 0 014.89 3.01l.117-.007H8.51l.23-.45a1 1 0 01.89-.547h4.786z" />
          </svg>
          <span class="btn-text">Remove string</span>
        </button>
      </div>
    </div>

    <div
      v-if="isMenuExpanded"
      class="menu-content"
    >
      <div class="section">
        <h3 class="section-header">
          Clues
        </h3>
        <div class="desc">
          The clues that make up the conspiracy
        </div>
        <button @click="addNode">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            role="presentation"
            class="cdr-icon_4.0.0 cdr-icon--large_4.0.0"
          >
            <path d="M11 11H6a1 1 0 000 2h5v5a1 1 0 002 0v-5h5a1 1 0 000-2h-5V6a1 1 0 00-2 0v5z" />
          </svg>
          <span class="btn-text">Add clue</span>
        </button>

        <button @click="removeNode">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            role="presentation"
            class="cdr-icon_4.0.0 cdr-icon--large_4.0.0"
          >
            <path d="M17.998 6.004c.557 0 1.01.448 1.01 1l-.003.062-.877 13.998a1.006 1.006 0 01-1.007.938H6.899c-.533 0-.974-.41-1.008-.937L5.002 7.067c-.032-.512.33-.958.827-1.047l.149-.015h12.02zM7.085 8.002l.761 12h8.325l.752-11.998-9.838-.002zm7.332-5.997a1 1 0 01.902.568l.206.429h3.48a1 1 0 01.116 1.994l-.117.006H5.008A1 1 0 014.89 3.01l.117-.007H8.51l.23-.45a1 1 0 01.89-.547h4.786z" />
          </svg>
          <span class="btn-text">Remove clue</span>
        </button>
      </div>
    </div>
    <modal name="my-first-modal">
      This is my first modal
    </modal>
  </div>
</template>

<script>
import Velocity from 'velocity-animate';
import AddNodeModal from './modals/AddNodeModal.vue';

export default {
  name: 'ConspiracyBoardMenu',
  data() {
    return {
      isMenuExpanded: false,
      menu: {
        expandedWidth: 200,
        expandedHeight: 831,
        collapsedWidth: 42,
        collapsedHeight: 37,
      }
    };
  },
  computed: {
    pointA() {
      return this.$store.state.newLink.pointA;
    },
    pointB() {
      return this.$store.state.newLink.pointB;
    },
  },
  watch: {
    pointA() {
      if (this.pointA && this.pointB) {
        this.$store.commit('createLink', {
          _id: `${this.pointA}${this.pointB}`,
          pointA: this.pointA,
          pointB: this.pointB,
        });
      }
    },
    pointB() {
      if (this.pointA && this.pointB) {
        this.$store.commit('createLink', {
          _id: `${this.pointA}${this.pointB}`,
          pointA: this.pointA,
          pointB: this.pointB,
        });
      }
    },
  },
  methods: {
    toggleMenu() {
      if (this.isMenuExpanded) {
        Velocity(this.$refs.menu, {
          width: this.menu.collapsedWidth,
          height: this.menu.collapsedHeight
        }, { duration: 250 });
      } else {
        Velocity(this.$refs.menu, {
          width: this.menu.expandedWidth,
          height: this.menu.expandedHeight
        }, { duration: 250 });
      }
      this.isMenuExpanded = !this.isMenuExpanded;
    },
    addLink() {
      this.$store.commit('isLinking', true);
    },
    removeLink() {
      this.$store.commit('isAntiLinking', true);
    },
    addNode() {
      this.$modal.show(AddNodeModal, { draggable: true });
      // this.$store.commit('isLinking', true);
    },
    removeNode() {
      this.$store.commit('isAntiLinking', true);
    },
  },
};
</script>

<style lang="scss" scoped>
.menu {
  position: fixed;
  top: 8px;
  right: 8px;
  padding: 4px 4px 0 4px;
  background-color: rgb(0, 0, 0, 0.5);
  text-align: left;
  color: antiquewhite;

  .menu-content {
    padding: 5px 10px;
    margin-top: 15px;
    width: 180px;

    .section {
      padding: 10px 0;
      border-top: 1px solid antiquewhite;

      .section-header {
        margin: 0 0 6px 0;
      }

      .desc {
        margin-bottom: 10px;
      }

      button {
        padding: 0;
        margin-bottom: 10px;
        color: antiquewhite;
        font-size: 16px;
        line-height: 17px;

        .btn-text {
          line-height: 34px;
          vertical-align: text-bottom;
          display: inline-block;
          padding-left: 5px;
        }
      }
    }
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
  }

  svg {
    fill: antiquewhite;
    width: 30px;
    height: 30px;
  }
}
</style>
