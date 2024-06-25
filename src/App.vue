<template>
  <div id="app">
    <template v-if="route.path.startsWith('/user')">
      <router-view />
    </template>
    <template v-else>
      <BasicLayout />
    </template>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import BasicLayout from "@/layouts/BasicLayout.vue";
import { onMounted } from "vue";
import ImgUploader from "@/components/ImgUploader.vue";

const route = useRoute();

const initBanner = () => {
  console.log(
    "    _               ____  _       _   \n" +
      "   / \\   ___       |  _ \\| | __ _| |_ \n" +
      "  / _ \\ / _ \\ _____| |_) | |/ _` | __|\n" +
      " / ___ \\ (_) |_____|  __/| | (_| | |_ \n" +
      "/_/   \\_\\___/      |_|   |_|\\__,_|\\__|"
  );
};

onMounted(() => {
  initBanner();
});
</script>

<style scoped>
#app {
}
</style>
