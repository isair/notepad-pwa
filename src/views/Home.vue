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
import Drawer from '@/components/Drawer.vue';
import Editor from '@/components/Editor.vue';

async function getNewFileHandle() {
  const opts = {
    type: 'save-file',
    accepts: [
      {
        description: 'Text file',
        extensions: ['txt'],
        mimeTypes: ['text/plain'],
      },
    ],
  };
  return await window.chooseFileSystemEntries(opts);
}

async function writeFile(fileHandle, contents) {
  const writable = await fileHandle.createWritable();
  await writable.write(contents);
  await writable.close();
}

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
      if (!window.chooseFileSystemEntries) {
        window.alert(
          'Please go to chrome://flags and enable "Native File System API"'
        );
        return;
      }
      const fileHandle = await window.chooseFileSystemEntries();
      this.fileHandles[this.activeIndex] = fileHandle;
      const file = await fileHandle.getFile();
      this.filePaths[this.activeIndex] = file.name;
      const contents = await file.text();
      this.fileContents[this.activeIndex] = contents;
    },
    async onFileSave() {
      if (!this.fileHandles[this.activeIndex]) {
        const handle = this.onFileSaveAs();
        if (handle) {
          this.fileHandles[this.activeIndex] = handle;
          this.filePaths[this.activeIndex] = (await handle.getFile()).name;
        }
        return;
      }
      writeFile(
        this.fileHandles[this.activeIndex],
        this.fileContents[this.activeIndex]
      );
    },
    async onFileSaveAs() {
      const handle = await getNewFileHandle();
      if (handle) {
        writeFile(handle, this.fileContents[this.activeIndex]);
        return handle;
      }
    },
  },
};
</script>
