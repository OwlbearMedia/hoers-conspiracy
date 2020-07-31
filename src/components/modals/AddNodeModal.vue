<template>
  <div class="add-clue">
    <div class="heading">
      <h1>Add a clue</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddNodeModal',
};
</script>

<style lang="scss" scoped>
  .add-clue {
    background-color: antiquewhite;
    height: 100%;

    .heading {
      border-bottom: 1px solid lightgray;
      padding: 15px;

      h1 {
        color: #2c3e50;
        font-family: Helvetica, Arial, sans-serif;
        font-size: 24px;
        font-weight: 500;
        margin: 0;
      }
    }
  }
</style>
