<template>
  <div :id="modalId" class="dialog">
    <div class="titlebar">
      <button>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="presentation" class="cdr-icon_4.0.0 cdr-icon--large_4.0.0"><path d="M13.415 12.006l5.295-5.292a1 1 0 00-1.414-1.415L12 10.591 6.71 5.296A1 1 0 005.295 6.71l5.292 5.295-5.295 5.292a1 1 0 101.414 1.414l5.295-5.292 5.292 5.295a1 1 0 001.414-1.414l-5.292-5.294z"></path></svg>
      </button>
    </div>
    
    <div class="content">
      <div class="dossier">
        <div class="section">
          <div class="line">Name:</div>
          <div class="line text">Vlad III</div>

          <div class="line">Aliases:</div>
          <div class="line text">Vlad the Impaler, Vlad Dracula</div>

          <div class="line">Date of Birth:</div>
          <div class="line text">Unknown, sometime between 1428 and 1431</div>

          <div class="line">Place of Birth:</div>
          <div class="line text">Sighișoara, Transylvania, Kingdom of Hungary</div>

          <div class="line">Occupation:</div>
          <div class="line text">Voivode of Wallachia</div>

          <div class="line last">Status:</div>
          <div class="line text last">Allegedly died in battle then hacked to pieces in 1476</div>
        </div>
        <div class="image-container">
          <img src="../assets/Vlad-III.jpg" alt="Vlad III" />
        </div>
      </div>

    </div>
    <!-- <div class="buttonpane">
      <div class="buttonset">
        <button>OK</button>
        <button>Cancel</button>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'ConspiracyModal',
  props: {
    modalId: {
      required: true,
    }
  },
};
</script>

<style lang="scss" scoped>
/*
 * Stylesheet for Draggable and Resizable Dialog Box
 *
 * Designed by ZulNs, @Gorontalo, Indonesia, 7 June 2017
 * Extended by FrankBuchholz, Germany, 2019
 * You can change all colors
 * You can change some of the sizes without expecting issues, see below
*/

.dialog {
  display: none; /* not visible by default */
  font-family: Verdana, sans-serif;
  font-weight: 400;
  color: #fff;
  background: url(../assets/rice-paper.jpg);
  margin: 0;
  position: absolute;
  width: 900px;
  height: 800px;
  filter: drop-shadow(3px 3px 3px rgb(0, 0, 0, 0.6));
}
.dialog .titlebar {
  height: 32px; /* same as .dialog>button height */
  line-height: 32px; /* same as .dialog>button height */
  vertical-align: middle;
  font-size: 1.2em;
  padding: 0 8px 0 8px; /* change NOT allowed */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: move;
}
.dialog .content {
  position: absolute;
  top: 48px; /* change allowed */
  left: 16px; /* change NOT allowed */
  overflow: auto;
  font-size: 1em;
  // font-family: King;
  color: #666;
  // font-size: 100px;

  .dossier {
    display: grid;
    margin: 1em 2em;
    grid-template-columns: 60% 35%;
    column-gap: 5%;
    text-align: left;

    .section {
      border: 2px solid #777;
      border-radius: 5px;
      
      font-weight: bold;
      display: grid;
      grid-template-columns: 30% 70%;

      .line {
        padding: 15px;
        border-bottom: 2px solid #666; 

        &.last {
          border-bottom: none; 
        }
      }
      .text {
        font-family: TravelingTypewriter;
      }
    }
    .image-container {
      border: 2px solid #777;
      border-radius: 5px;
      height: 300;
      position: relative;

      img {
        position: absolute;
        width: 290px;
        top: 5px;
        transform: rotate(-2deg)
      }
    }
  }
}
.dialog .buttonpane:before {
  width: 100%;
  height: 0;
  border-bottom: 1px solid; /* change allowed */
  content: "";
  position: absolute;
  top: -16px; /* change allowed */
  left: 0;
}
.dialog .buttonpane {
  width: 100%;
  position: absolute;
  bottom: 16px; /* change allowed */
  right: 16px; /* change NOT allowed */
  white-space: nowrap; /* keep buttons on one line */
}
.dialog .buttonset {
  float: right;
}
.dialog button {
  -webkit-transition: 0.25s;
  transition: 0.25s;
  color: #666;
  background: none;
  border: none;
  float: right;
  line-height: 32px;
  font-size: 24px;
}
/* .dialog button.hover, */ /* Let's use standard hover */
.dialog button:hover,
.dialog button.active {
  cursor: pointer;
}
.dialog > button {
  width: 32px; /* change NOT allowed */
  height: 32px; /* same as .dialog .titlebar height */
  position: absolute;
  top: 0;
  right: 0;
  padding: 0;
  border: 0;
  
}
/* .dialog>button.hover, */
.dialog > button:hover,
.dialog > button.focus {
  box-shadow: inset -16px 0 0 0 #e80, inset 16px 0 0 0 #e80;
}
.dialog > button.active {
  background: #f55; /* irrelevant */
  border: 1px solid #ddd; /* irrelevant */
}
.dialog .buttonset button {
  height: 32px; /* change allowed */
  width: 64px; /* change allowed */
  font-size: 1.1em;
  padding: 0; /* irrelevant */
  border: 2px solid #fff; /* change allowed */
  border-radius: 4px; /* change allowed */
  margin-left: 16px; /* change NOT allowed */
  background: #39c;
}
.dialog .buttonset button:first-child {
  margin-left: 0;
}
/* .dialog .buttonset button.hover, */
.dialog .buttonset button:hover,
.dialog .buttonset button.focus {
  box-shadow: inset -32px 0 0 0 #17a, inset 32px 0 0 0 #17a;
}
.dialog .buttonset button.active {
  background: #1a7;
  border-color: #ddd;
}
</style>