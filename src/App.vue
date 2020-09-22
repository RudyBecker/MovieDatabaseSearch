<template>
  <div id="app">
    <!-- Component that shows search, movies returned from database, and interface to save/remove movies from My Collection -->
    <SearchMovies />
  </div>
</template>

<script>
import SearchMovies from "./components/SearchMovies.vue";

export default {
  name: "app",
  components: {
    SearchMovies
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
</style>
