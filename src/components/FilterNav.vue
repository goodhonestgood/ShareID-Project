<template>
  <div class="mt-1 mb-3">
    <ul class="nav justify-content-center text-dark">
      <li class="nav-item">
        <button class="nav-link" :class="{ 'text-info' : clickStyle.All }" @click="typeClick('All')"> All </button>
      </li>
      <li class="nav-item">
        <button class="nav-link" :class="{ 'text-info' : clickStyle.Wavve }" @click="typeClick('Wavve')"> Wavve </button>
      </li>
      <li class="nav-item">
        <button class="nav-link" :class="{ 'text-info' : clickStyle.Tving }" @click="typeClick('Tving')"> Tving </button>
      </li>
      <li class="nav-item">
        <button class="nav-link" :class="{ 'text-info' : clickStyle.Netflix }" @click="typeClick('Netflix')"> Netflix </button>
      </li>
    </ul>
  </div>
</template>
<script>
import { useStore } from 'vuex'
import { ref, computed } from 'vue'

export default {
  setup() {
    let clickStyle = ref({
        'All' : true,
        'Wavve' : false,
        'Tving' : false,
        'Netflix' : false,
    })
    let curType = 'All'
    const store = useStore()
    // type filter
    const typeClick = (type) => {
        store.dispatch('ChatRoomModule/getAllRoom', { type: type })
        clickStyle.value[curType] = false
        clickStyle.value[type] = true
        curType = type
    }
    return { typeClick, clickStyle }
  },
}
</script>