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
          v-bind:key="index"
          href="#scroll-tab-1"
          class="mdl-layout__tab is-active"
          >{{ name }}</a
        >
      </div>
    </header>
    <!-- Drawer -->
    <Drawer
      v-bind:onFileOpen="onFileOpen"
      v-bind:onFileSave="onFileSave"
      v-bind:onFileSaveAs="onFileSaveAs"
    />
    <!-- Content -->
    <main class="mdl-layout__content">
      <section
        v-for="(handle, index) in fileHandles"
        v-bind:key="index"
        class="mdl-layout__tab-panel is-active"
        id="scroll-tab-1"
      >
        <Editor v-model="fileContents[index]" />
      </section>
    </main>
  </div>
</template>

<script>
import environment from '@/environment';
import * as fileUtils from '@/utils/file';

import Drawer from '@/components/Drawer.vue';
import Editor from '@/components/Editor.vue';

export default {
  name: 'Home',
  components: {
    Drawer,
    Editor,
  },
  data: () => ({
    activeIndex: 0,
    fileHandles: [null],
    fileContents: [''],
  }),
  computed: {
    fileNames() {
      return this.fileHandles.map(handle =>
        handle ? fileUtils.getName(handle) : environment.defaultTabTitle
      );
    },
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
    async onFileSave() {
      if (!this.fileHandles[this.activeIndex]) {
        const handle = this.onFileSaveAs();
        if (handle) {
          const newHandles = [...this.fileHandles];
          newHandles[this.activeIndex] = handle;
          this.fileHandles = newHandles;
        }
        return;
      }
      fileUtils.write(
        this.fileHandles[this.activeIndex],
        this.fileContents[this.activeIndex]
      );
    },
    async onFileSaveAs() {
      const handle = await fileUtils.choose(true, environment.accepts);
      if (handle) {
        fileUtils.write(handle, this.fileContents[this.activeIndex]);
        return handle;
      }
    },
  },
};
</script>
