<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  watch: {
    $route: {
      handler: (to, from) => {
        document.title = to.meta.title;
      },
      immediate: true,
    },
  },
};
</script>

<style>
@import "./assets/styles.css";

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
}
</style>
