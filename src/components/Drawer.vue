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
        <li
          class="mdl-list__item mdl-navigation__link"
          :class="{ disabled: !areAnyFilesOpen }"
          v-on:click="onFileSave"
        >
          <span class="mdl-list__item-primary-content">
            <i class="material-icons mdl-list__item-icon">save</i>
            Save
          </span>
        </li>
        <li
          class="mdl-list__item mdl-navigation__link"
          :class="{ disabled: !areAnyFilesOpen }"
          v-on:click="onFileSaveAs"
        >
          <span class="mdl-list__item-primary-content">
            <i class="material-icons mdl-list__item-icon">redo</i>
            Save As
          </span>
        </li>
      </ul>
      <ul class="mdl-list">
        <li class="mdl-list__item mdl-navigation__link">
          <label
            class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect"
            for="checkbox-auto-save"
          >
            <input
              v-model="shouldAutoSave"
              v-on:change="handleShouldAutoSaveChange"
              type="checkbox"
              id="checkbox-auto-save"
              class="mdl-checkbox__input"
            />
            <span class="mdl-checkbox__label">Auto Save</span>
          </label>
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

import checkInstalled from '@/utils/checkInstalled';
import { StorageKey, getItem, setItem } from '@/utils/storage';

export default Vue.extend({
  name: 'Drawer',
  props: {
    areAnyFilesOpen: Boolean,
    onFileOpen: Function,
    onFileSave: Function,
    onFileSaveAs: Function,
    onAutoSaveChange: Function,
  },
  data: () => ({
    isInstalled: checkInstalled(),
    shouldAutoSave: getItem<boolean>(StorageKey.shouldAutoSave),
  }),
  methods: {
    handleShouldAutoSaveChange() {
      setItem(StorageKey.shouldAutoSave, this.shouldAutoSave);
      this.onAutoSaveChange && this.onAutoSaveChange(this.shouldAutoSave);
    },
  },
});
</script>

<style lang="stylus" scoped>
.mdl-list__item
  cursor: pointer

.disabled
  pointer-events: none
  opacity: 0.5
</style>
