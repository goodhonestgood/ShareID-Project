<template>
    <div class="form-signin">
        <img class="mb-3" src="../assets/LogoSample.jpg" alt="logo" />
        <h1 class="h3 mb-3 fw-normal">Login to Your Account</h1>
        <form @submit.prevent="handleSubmit">
            <div class="form-floating">
                <input type="email" v-model="email" class="form-control" id="floatingInput" placeholder="name@example.com">
                <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating" >
                <input type="password" v-model="password" class="form-control" id="floatingPassword" placeholder="Password">
                <label for="floatingPassword">Password</label>
            </div>
            <p class="my-1" v-if="error">{{ error }}</p>
            <button class="btn btn-outline-primary mt-2" type="submit">로그인</button>
        </form>
    </div>
</template>
<script>
import { useRouter } from 'vue-router' // import router
import { ref } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const email = ref('')
    const password = ref('')
    const error = ref(null)

    const router = useRouter()
    const store = useStore()
    const handleSubmit = async () => {
        try {
          await store.dispatch('login', {email: email.value, password: password.value})
          router.push('/') // home
        } catch(err) {
          error.value = err.message
        }
    }
    return {handleSubmit,email,password,error}
  },
}
</script>