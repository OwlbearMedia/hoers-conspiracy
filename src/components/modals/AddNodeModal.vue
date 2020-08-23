<template>
  <div class="add-clue">
    <div class="add-clue__heading">
      <h1>Add a clue</h1>
    </div>
    <div class="add-clue__body">
      <form>
        <div>
          <label for="clue-type">Type:</label>
          <select
            id="clue-type"
            v-model="model.type"
          >
            <option value="">
              --Please choose an option--
            </option>
            <option value="note">
              Note
            </option>
            <option value="person">
              Person
            </option>
            <option value="document">
              Document
            </option>
            <option value="map">
              Map
            </option>
          </select>
        </div>
        <div v-if="model.type === 'note'">
          <label for="clue-text">Text:</label>
          <input
            id="clue-text"
            v-model="model.title"
            type="text"
          >
        </div>

        <div v-if="model.type">
          <button @click.prevent="add">
            Add
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddNodeModal',
  data() {
    return {
      model: {
        type: '',
        title: '',
        top: 100,
        left: 100,
      },
    };
  },
  methods: {
    add() {
      this.$store.commit('addNote', this.model);
      this.$modal.hideAll();
    },
  },
};
</script>

<style lang="scss" scoped>
.add-clue {
  background-color: antiquewhite;
  height: 100%;

  &__heading {
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
