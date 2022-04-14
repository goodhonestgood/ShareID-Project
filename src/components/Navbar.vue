<template>
  <div class="py-1 bg-light">
    <ul class="nav justify-content-end align-items-center">
      <li class="nav-item"><img class="img-fluid img-thumbnail float-start" src="../assets/LogoSample.jpg" alt="logo" /></li>
      <li class="nav-item">
        <div v-if="isLoggedIn"><a href="#" class="hover nav-link text-secondary" @click="handleClick"> Logout </a></div>
        <div  v-if="!isLoggedIn">
          <router-link class="nav-link d-inline-block text-secondary" to="/register"> 회원가입 </router-link>
          <router-link class="nav-link d-inline-block text-secondary" to="/sign-in"> 로그인 </router-link>
        </div>
      </li>
      <li class="nav-item me-1">
        <form class="d-flex" @submit.prevent="">
          <input class="form-control me-2 text-secondary" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-secondary" type="submit">Search</button>
        </form>
      </li>
    </ul>
  </div>
  <div class="menu mt-1 mb-3">
    <ul class="nav justify-content-center">
      <li class="nav-item">
        <router-link class="nav-link text-dark" to="/"> 홈 </router-link>
      </li>
      <li class="nav-item">
        <div v-if="isLoggedIn"><router-link class="nav-link text-info" to="/my-chat"> 나의 채팅방 </router-link></div>
      </li>
      <li class="nav-item">
        <router-link class="nav-link text-secondary" to="/my-page"> 마이페이지 </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import { useStore } from 'vuex'
import { ref, computed } from 'vue'

export default {
  setup() {
    const store = useStore()
    const isLoggedIn = computed(() => store.state.user)
    const authIsReady = computed(() => store.state.authIsReady)
    
    const handleClick = () => {
      store.dispatch('logout')
    }

    return { isLoggedIn, authIsReady, handleClick}
  },
}
</script>
<style lang="scss" scoped>
@import "../../node_modules/bootstrap/scss/functions";

$thumbnail-border-width : 50px;

@import "../../node_modules/bootstrap/scss/variables";
@import "../../node_modules/bootstrap/scss/mixins";
@import "../../node_modules/bootstrap/scss/root";

@import "../../node_modules/bootstrap/scss/images";

</style>