<template>
  <!-- <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div> -->
  <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
    <header class="mdl-layout__header">
      <div class="mdl-layout__header-row">
        <!-- Title -->
        <span class="mdl-layout-title">Notepad</span>
        <!-- Add spacer, to align navigation to the right -->
        <div class="mdl-layout-spacer"></div>
        <!-- Navigation. We hide it in small screens. -->
        <nav class="mdl-navigation mdl-layout--large-screen-only">
          <a class="mdl-navigation__link" href="">Open</a>
          <a class="mdl-navigation__link" href="">Save</a>
        </nav>
      </div>
      <!-- Tabs -->
      <div class="mdl-layout__tab-bar mdl-js-ripple-effect">
        <a href="#scroll-tab-1" class="mdl-layout__tab is-active">New File</a>
      </div>
    </header>
    <!-- Drawer -->
    <div class="mdl-layout__drawer">
      <span class="mdl-layout-title">Notepad</span>
      <nav class="mdl-navigation">
        <a class="mdl-navigation__link" href="">Open</a>
        <a class="mdl-navigation__link" href="">Save</a>
        <a
          class="mdl-navigation__link"
          href="https://github.com/isair/notepad-pwa"
          target="_blank"
          rel="noopener noreferrer"
          >Source Code</a
        >
      </nav>
    </div>
    <!-- Content -->
    <main class="mdl-layout__content">
      <section class="mdl-layout__tab-panel is-active" id="scroll-tab-1">
        <div class="page-content"><!-- TODO: Editor --></div>
      </section>
    </main>
  </div>
</template>

<script>
require('material-design-lite');
</script>

<style>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
@import url('https://code.getmdl.io/1.2.1/material.green-red.min.css');
</style>

<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px
</style>
