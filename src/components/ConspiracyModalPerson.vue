<template>
  <div class="person-content">
    <div class="dossier main">
      <div class="section">
        <div class="line header">
          File No. {{ model.id }}
        </div>

        <div class="line">
          Name:
        </div>
        <div
          class="line text"
          :class="{ 'edit-mode': editMode }"
        >
          <span v-if="!editMode">{{ model.name }}</span>
          <input
            v-if="editMode"
            v-model="model.name"
            type="text"
          >
        </div>

        <div class="line">
          Aliases:
        </div>
        <div
          class="line text"
          :class="{ 'edit-mode': editMode }"
        >
          <span v-if="!editMode">{{ model.aliases }}</span>
          <input
            v-if="editMode"
            v-model="model.aliases"
            type="text"
          >
        </div>

        <div class="line">
          Date of Birth:
        </div>
        <div
          class="line text"
          :class="{ 'edit-mode': editMode }"
        >
          <span v-if="!editMode">{{ model.dob }}</span>
          <input
            v-if="editMode"
            v-model="model.dob"
            type="text"
          >
        </div>

        <div class="line">
          Place of Birth:
        </div>
        <div
          class="line text"
          :class="{ 'edit-mode': editMode }"
        >
          <span v-if="!editMode">{{ model.birthplace }}</span>
          <input
            v-if="editMode"
            v-model="model.birthplace"
            type="text"
          >
        </div>

        <div class="line">
          Occupation:
        </div>
        <div
          class="line text"
          :class="{ 'edit-mode': editMode }"
        >
          <span v-if="!editMode">{{ model.occupation }}</span>
          <input
            v-if="editMode"
            v-model="model.occupation"
            type="text"
          >
        </div>

        <div class="line last">
          Status:
        </div>
        <div
          class="line text last"
          :class="{ 'edit-mode': editMode }"
        >
          <span v-if="!editMode">{{ model.status }}</span>
          <input
            v-if="editMode"
            v-model="model.status"
            type="text"
          >
        </div>
      </div>
      <div class="image-container">
        <img
          class="main"
          :src="imgUrl"
          :alt="model.name"
        >
        <img
          v-if="imgUrl"
          class="tape"
          src="../assets/tape.png"
          alt="a piece of tape holding image in place"
        >
      </div>
    </div>

    <div class="dossier secondary">
      <div class="section">
        <div class="line">
          Physical Description:
        </div>
        <div class="line text">
          {{ model.description }}
        </div>

        <div class="line last">
          Notes:
        </div>
        <div class="line text last">
          {{ model.notes }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConspiracyModalPerson',
  props: {
    editMode: {
      type: Boolean,
      required: true,
    },
    personData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      model: this.personData.content,
    };
  },
  computed: {
    imgUrl() {
      let src = this.personData.image;
      if (src) {
        const images = require.context('../assets/', false, /\.jpg$/);
        src = images(`./${src}`);
      }
      return src;
    },
  },
};
</script>

<style lang="scss" scoped>
.tape {
  position: absolute;
  top: -40px;
  width: 250px;
  right: 16px;
  transform: rotate(-8deg);
  z-index: 9;
}

.person-content {
  text-align: left;
  color: #666;
  margin: 70px 40px 40px 40px;

  .dossier {
    display: grid;

    &.main {
      grid-template-columns: calc(60% - 20px) calc(40% - 20px);
      column-gap: 40px;
    }

    &.secondary {
      margin-top: 40px;
    }

    .section {
      border: 2px solid #777;
      border-radius: 5px;

      font-weight: bold;
      display: grid;
      grid-template-columns: 150px calc(100% - 150px);

      .line {
        padding: 12px;
        border-bottom: 2px solid #666;

        &.edit-mode {
          padding: 0;

          input {
            height: 43px;
            width: 302px;
          }
        }

        &.last {
          border-bottom: none;
        }
      }
      .text {
        font-family: TravelingTypewriter;
        color: #000;
      }

      .header {
        color: antiquewhite;
        background-color: #777;
        grid-column-start: 1;
        grid-column-end: span 2;
        text-transform: uppercase;
      }
    }

    .image-container {
      border: 2px solid #777;
      border-radius: 5px;
      height: 300;
      position: relative;

      .main {
        position: absolute;
        width: 305px;
        top: 5px;
        right: -5px;
        transform: rotate(-2deg);
        filter: drop-shadow(3px 3px 3px rgb(0, 0, 0, 0.6));
      }
    }
  }
}
</style>
