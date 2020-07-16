<template>
  <div class="person-content">
    <div class="dossier main">
      <div class="section">
        <div class="line header">File No. {{ personData.content.id }}</div>

        <div class="line">Name:</div>
        <div class="line text">{{ personData.content.name }}</div>

        <div class="line">Aliases:</div>
        <div class="line text">{{ personData.content.aliases }}</div>

        <div class="line">Date of Birth:</div>
        <div class="line text">{{ personData.content.dob }}</div>

        <div class="line">Place of Birth:</div>
        <div class="line text">{{ personData.content.birthplace }}</div>

        <div class="line">Occupation:</div>
        <div class="line text">{{ personData.content.occupation }}</div>

        <div class="line last">Status:</div>
        <div class="line text last">{{ personData.content.status }}</div>
      </div>
      <div class="image-container">
        <img class="main" :src="imgUrl" :alt="personData.content.name" />
      </div>
    </div>

    <div class="dossier secondary">
      <div class="section">
        <div class="line">Physical Description:</div>
        <div class="line text">{{ personData.content.description }}</div>

        <div class="line last">Notes:</div>
        <div class="line text last">{{ personData.content.notes }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConspiracyModalPerson',
  props: {
    personData: {
      type: Object,
      required: true,
    },
  },
  computed: {
    imgUrl() {
      let src = this.personData.image;
      if (src) {
        const images = require.context('../assets/', false, /\.jpg$/)
        src = images(`./${src}`)
      }
      return src;
    },
  },
  methods: {
    getImgUrl(pet) {
      var images = require.context('../assets/', false, /\.jpg$/)
      return images('./' + pet + ".jpg")
    },
  },
};
</script>

<style lang="scss" scoped>
// .paperclip {
//   position: absolute;
//   top: -8px;
//   width: 50px;
//   right: 60px;
//   z-index: 10
// }

.person-content {
  text-align: left;
  color: #666;

  .dossier {
    display: grid;
    margin: 1em 2em;

    &.main {
      grid-template-columns: calc(60% - 25px) calc(40% - 25px);
      column-gap: 50px;
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

        &.last {
          border-bottom: none; 
        }
      }
      .text {
        font-family: TravelingTypewriter;
        color: #000;
      }

      .header {
        color: floralwhite;
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