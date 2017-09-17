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

<style>
#app {
  font-family: 'Nunito Sans', 'Nunito', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 0px;
  font-size: 100%;

}

.pointer {
  cursor: pointer;
}

@media all and (max-device-width: 720px){
  h1{
    font-size: 200%;

  }

}

@media all and (max-device-width: 640px){

        font-size: 120$;

}

@media all and (max-device-width: 320px){

        font-size: 140%;
}
</style>
