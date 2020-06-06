<template>
  <div id="#app">
    <router-view />
  </div>
</template>

<script>
require('material-design-lite');
</script>

<style>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
@import url('https://code.getmdl.io/1.2.1/material.teal-red.min.css');
</style>

<style lang="stylus">
.mdl-layout__content
    display: flex
    flex-direction: column
    .mdl-layout__tab-panel
        flex-grow: 2
</style>
