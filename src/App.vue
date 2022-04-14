<script>
</script>

<template>
  <NavbarVue/>
  <div class="container">
    <router-view></router-view>
  </div>
</template>
<script>
import NavbarVue from "./components/Navbar.vue"
export default {
  components: {
    NavbarVue,
  },
  setup() {
    
  },
}
</script>
<style>
@import "bootstrap/dist/css/bootstrap.min.css";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
