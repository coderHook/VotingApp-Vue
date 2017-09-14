<template>
  <div id="app">
    <app-header></app-header>
    <router-view></router-view>

  </div>

</template>

<script>
import Header from "./components/Header.vue";
import Home from "./components/Home.vue";

export default {
  components: {
    appHeader: Header,
    appHome: Home
  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 0px;
}
</style>
