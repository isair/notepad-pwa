<template>
  <div class="page-content fill">
    <textarea
      v-model="contents"
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
    onChange: Function,
  },
  data: function() {
    return {
      contents: '',
    };
  },
  methods: {
    setContents(value: string) {
      this.contents = value;
    },
    getContents() {
      return this.contents;
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
</style>
