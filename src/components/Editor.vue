<template>
  <div class="page-content fill">
    <textarea
      v-model="content"
      @input="handleInput"
      class="editor-textarea fill"
      type="text"
    ></textarea>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Editor',
  props: {
    value: String,
  },
  data: () => ({
    content: '',
  }),
  watch: {
    value(newValue) {
      this.content = newValue;
    },
  },
  methods: {
    handleInput() {
      this.$emit('input', this.content);
    },
  },
});
</script>

<style lang="stylus" scoped>
.fill
  width: 100%
  height: 100%
.editor-textarea
  padding: 20px
  border: none
  outline: none
</style>
