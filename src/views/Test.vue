<template>
  <div>
    <h2>{{ rootStateData }}</h2>
    <button @click="setRoot">Set Root Data</button>
  </div>
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "Test",
  setup() {
    const store = useStore();
    const rootStateData = computed(() => store.state.data);
    const setRoot = () => store.dispatch("setRootData", "testRoot"); //RootState

    return {
      rootStateData,
      setRoot,
    };
  },
};
</script>

<style>
</style>