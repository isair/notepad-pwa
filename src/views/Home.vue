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
          v-for="(path, index) in filePaths"
          v-bind:key="index"
          href="#scroll-tab-1"
          class="mdl-layout__tab is-active"
          >New File</a
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
        v-for="(path, index) in filePaths"
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
  data: function() {
    return {
      activeIndex: 0,
      fileHandles: [null],
      filePaths: [''],
      fileContents: [''],
    };
  },
  methods: {
    async onFileOpen() {
      if (!fileUtils.checkSupport()) {
        return;
      }
      const handle = await fileUtils.choose(false, environment.accepts);
      this.fileHandles[this.activeIndex] = handle;
      const file = await fileUtils.getFile(handle);
      this.filePaths[this.activeIndex] = fileUtils.getName(file);
      const contents = await fileUtils.getText(file);
      this.fileContents[this.activeIndex] = contents;
    },
    async onFileSave() {
      if (!this.fileHandles[this.activeIndex]) {
        const handle = this.onFileSaveAs();
        if (handle) {
          this.fileHandles[this.activeIndex] = handle;
          const file = await fileUtils.getFile(handle);
          this.filePaths[this.activeIndex] = fileUtils.getName(file);
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
