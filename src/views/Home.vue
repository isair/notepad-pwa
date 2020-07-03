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
          @click.prevent="() => onTabClick(index)"
        >
          {{ name }}
        </a>
        <a class="mdl-layout__tab" href="#" @click.prevent="onNewTab">+</a>
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
        <editor v-model="fileContents[activeIndex]" />
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
    fileContents: [''],
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
      newHandles[this.activeIndex] = handle;
      this.fileHandles = newHandles;

      const file = await fileUtils.getFile(handle);
      const text = await fileUtils.getText(file);

      const newContents = [...this.fileContents];
      newContents[this.activeIndex] = text;
      this.fileContents = newContents;
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
      fileUtils.write(this.fileHandles[index], this.fileContents[index]);
    },
    async onFileSaveAs(index: number) {
      const handle = await fileUtils.choose(true, environment.accepts);
      if (handle) {
        fileUtils.write(handle, this.fileContents[index]);
        return handle;
      }
    },
    onTabClick(index: number) {
      this.activeIndex = index;
    },
    onNewTab() {
      this.fileHandles = [...this.fileHandles, null];
      this.fileContents = [...this.fileContents, ''];
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
          this.onFileSave(index);
        });
      }, environment.autoSaveInterval);
    },
    stopAutoSaver() {
      if (!this.autoSaveTimer) return;
      clearInterval(this.autoSaveTimer);
    },
  },
});
</script>
