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
          v-for="(path, index) in openFilePaths"
          v-bind:key="index"
          href="#scroll-tab-1"
          class="mdl-layout__tab is-active"
          >New File</a
        >
      </div>
    </header>
    <!-- Drawer -->
    <Drawer v-bind:onFileOpen="onFileOpen" v-bind:onFileSave="onFileSave" />
    <!-- Content -->
    <main class="mdl-layout__content">
      <section
        v-for="(path, index) in openFilePaths"
        v-bind:key="index"
        class="mdl-layout__tab-panel is-active"
        id="scroll-tab-1"
      >
        <Editor />
      </section>
    </main>
  </div>
</template>

<script>
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
      openFilePaths: [''],
    };
  },
  methods: {
    onFileOpen() {
      window.alert('open');
    },
    onFileSave() {
      window.alert('save');
    },
  },
};
</script>
