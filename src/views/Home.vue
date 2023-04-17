<template>
  <div
    class="mdl-layout mdl-js-layout mdl-layout--fixed-header mdl-layout--fixed-drawer"
  >
    <header class="mdl-layout__header">
      <div class="mdl-layout__header-row">
        <!-- Title -->
        <span class="mdl-layout-title">Notepad</span>
      </div>
      <!-- Tabs -->
      <div class="mdl-layout__tab-bar mdl-js-ripple-effect">
        <a
          v-for="(name, index) in fileNames"
          :key="index"
          class="mdl-layout__tab"
          :class="{ 'is-active': index === activeIndex }"
          href="#"
          @click="() => onTabClick(index)"
        >
          {{ name }}<span v-if="tabChangeFlags[index]"> *</span>
          <button
            class="mdl-button mdl-js-button mdl-button--icon"
            @click.stop="() => onTabRemove(index)"
          >
            <i class="material-icons">close</i>
          </button>
        </a>
        <a class="mdl-layout__tab" href="#" @click="onTabAdd">+</a>
      </div>
    </header>
    <!-- Drawer -->
    <drawer
      :onFileOpen="onFileOpen"
      :onFileSave="() => onFileSave(activeIndex)"
      :onFileSaveAs="() => onFileSaveAs(activeIndex)"
      :onAutoSaveChange="onAutoSaveChange"
    />
    <!-- Content -->
    <main class="mdl-layout__content">
      <section class="mdl-layout__tab-panel is-active">
        <editor
          v-model="tabContents[activeIndex]"
          @input="() => onTabContentChange(activeIndex)"
        />
      </section>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import environment from '@/environment';
import * as fileUtils from '@/utils/file';
import { StorageKey, getItem } from '@/utils/storage';

import Drawer from '@/components/Drawer.vue';
import Editor from '@/components/Editor.vue';

export default Vue.extend({
  name: 'Home',
  components: {
    Drawer,
    Editor,
  },
  data: () => ({
    activeIndex: 0,
    fileHandles: [null],
    tabContents: [''],
    tabChangeFlags: [false],
    autoSaveTimer: null as number | null,
  }),
  computed: {
    fileNames() {
      return this.fileHandles.map((handle) =>
        handle ? fileUtils.getName(handle) : environment.defaultTabTitle
      );
    },
  },
  mounted() {
    const shouldAutoSave = getItem<boolean>(StorageKey.shouldAutoSave);
    if (!shouldAutoSave) return;
    this.startAutoSaver();
  },
  methods: {
    async onFileOpen() {
      if (!fileUtils.checkSupport()) {
        return;
      }

      const handle = await fileUtils.choose(false, environment.accepts);

      const newHandles = [...this.fileHandles];
      this.fileHandles = newHandles;

      const file = await fileUtils.getFile(handle);
      const text = await fileUtils.getText(file);

      const newContents = [...this.tabContents];
      newContents[this.activeIndex] = text;
      this.tabContents = newContents;
      const newFlags = [...this.tabChangeFlags];
      newFlags[this.activeIndex] = false;
      this.tabChangeFlags = newFlags;
    },
    async onFileSave(index: number) {
      if (!this.fileHandles[index]) {
        const handle = await this.onFileSaveAs(index);
        if (handle) {
          const newHandles = [...this.fileHandles];
          newHandles[index] = handle;
          this.fileHandles = newHandles;
        }
        return;
      }
      await fileUtils.write(this.fileHandles[index], this.tabContents[index]);
      const newFlags = [...this.tabChangeFlags];
      newFlags[index] = false;
      this.tabChangeFlags = newFlags;
    },
    async onFileSaveAs(index: number) {
      const handle = await fileUtils.choose(true, environment.accepts);
      if (handle) {
        await fileUtils.write(handle, this.tabContents[index]);
        const newHandles = [...this.fileHandles];
        newHandles[index] = handle;
        this.fileHandles = newHandles;
        const newFlags = [...this.tabChangeFlags];
        newFlags[index] = false;
        this.tabChangeFlags = newFlags;
        return handle;
      }
    },
    onTabClick(index: number) {
      this.activeIndex = index;
    },
    onTabAdd() {
      this.fileHandles = [...this.fileHandles, null];
      this.tabContents = [...this.tabContents, ''];
      this.tabChangeFlags = [...this.tabChangeFlags, false];
    },
    async onTabRemove(index: number) {
      if (this.tabChangeFlags[index]) {
        const confirmClose = confirm(
          `"${this.fileNames[index]}" has not been saved. Are you sure you would like to close it?`
        );
        if (!confirmClose) return;
      }
      // Remove the tab.
      if (this.fileHandles.length > 1) {
        this.fileHandles.splice(index, 1);
        this.tabContents.splice(index, 1);
        this.tabChangeFlags.splice(index, 1);
        if (index <= this.activeIndex) {
          this.activeIndex = index > 0 ? index - 1 : index;
        }
      } else {
        this.fileHandles[0] = null;
        this.tabContents[0] = '';
        this.tabChangeFlags[0] = false;
      }
    },
    onAutoSaveChange(shouldAutoSave: boolean) {
      if (shouldAutoSave) {
        this.startAutoSaver();
      } else {
        this.stopAutoSaver();
      }
    },
    startAutoSaver() {
      this.stopAutoSaver();
      this.autoSaveTimer = setInterval(() => {
        this.fileHandles.forEach((handle, index) => {
          // Only auto save a tab if it has an associated file.
          if (!handle) return;
          if (!this.tabChangeFlags[index]) return; // Skip unchanged tabs.
          this.onFileSave(index);
        });
      }, environment.autoSaveInterval);
    },
    stopAutoSaver() {
      if (!this.autoSaveTimer) return;
      clearInterval(this.autoSaveTimer);
    },
    onTabContentChange(index: number) {
      if (this.tabChangeFlags[index]) return;
      const newFlags = [...this.tabChangeFlags];
      newFlags[index] = true;
      this.tabChangeFlags = newFlags;
    },
  },
});
</script>

<style lang="stylus" scoped>
.mdl-layout__tab
  padding-right: 0 !important

.mdl-layout__tab > .mdl-button
  opacity: 0.5 !important
  position: relative
  bottom: 10px

.mdl-layout__tab > .mdl-button > .material-icons
  font-size: 16px
</style>
