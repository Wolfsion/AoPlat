<template>
  <div class="appDetailView">
    <h2>{{ props.appId }}</h2>
    <a-card class="singleApp" hoverable>
      <a-row class="grid-demo" style="margin-bottom: 16px">
        <a-col flex="auto">
          <div>auto</div>
        </a-col>
        <a-col flex="320px">
          <div>100px</div>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from "vue";
import { useRouter } from "vue-router";
import { AppDetailProps } from "@/types/appProps";

const props = withDefaults(defineProps<AppDetailProps>(), {
  appId: () => {
    return "";
  },
});

const router = useRouter();
</script>
<style scoped>
.singleApp {
  cursor: pointer;
}

.icon-hover {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  transition: all 0.1s;
}

.icon-hover:hover {
  background-color: rgb(var(--gray-2));
}
</style>
