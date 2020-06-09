<template>
  <div class="mdl-layout__drawer">
    <span class="mdl-layout-title">Options</span>
    <nav class="mdl-navigation">
      <ul class="mdl-list">
        <li class="mdl-list__item mdl-navigation__link" v-on:click="onFileOpen">
          <span class="mdl-list__item-primary-content">
            <i class="material-icons mdl-list__item-icon">folder</i>
            Open
          </span>
        </li>
        <li class="mdl-list__item mdl-navigation__link" v-on:click="onFileSave">
          <span class="mdl-list__item-primary-content">
            <i class="material-icons mdl-list__item-icon">save</i>
            Save
          </span>
        </li>
        <li
          class="mdl-list__item mdl-navigation__link"
          v-on:click="onFileSaveAs"
        >
          <span class="mdl-list__item-primary-content">
            <i class="material-icons mdl-list__item-icon">redo</i>
            Save As
          </span>
        </li>
      </ul>
      <a
        v-if="!isInstalled"
        class="mdl-navigation__link"
        href="https://support.google.com/chrome/answer/9658361"
        target="_blank"
        rel="noopener noreferrer"
        >How to Add to Device</a
      >
      <a
        class="mdl-navigation__link"
        href="https://github.com/isair/notepad-pwa"
        target="_blank"
        rel="noopener noreferrer"
        >Source Code</a
      >
    </nav>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Drawer',
  props: {
    onFileOpen: Function,
    onFileSave: Function,
    onFileSaveAs: Function,
  },
  data: () => ({
    isInstalled: window.matchMedia('(display-mode: standalone)').matches,
  }),
});
</script>

<style lang="stylus" scoped>
.mdl-list__item
  cursor: pointer
</style>
