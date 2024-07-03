<template>
  <div class="appCard">
    <a-card class="innerCard" hoverable @click="switchDetail">
      <template #actions>
        <!--        <span class="icon-hover"> <IconThumbUp /> </span>-->
        <span class="icon-hover"> <IconShareInternal /> </span>
        <!--        <span class="icon-hover"> <IconMore /> </span>-->
      </template>
      <template #cover>
        <div
          :style="{
            height: '204px',
            overflow: 'hidden',
          }"
        >
          <img
            :style="{ width: '100%', transform: 'translateY(-20px)' }"
            alt="dessert"
            :src="app.appIcon"
          />
        </div>
      </template>
      <a-card-meta :title="app.appName" :description="app.appDesc">
        <template #avatar>
          <div
            :style="{ display: 'flex', alignItems: 'center', color: '#1D2129' }"
          >
            <a-avatar
              :size="24"
              :style="{ marginRight: '8px' }"
              :image-url="app.user?.userAvatar"
            />
            <a-typography-text>{{
              app.user?.userName ?? "匿名"
            }}</a-typography-text>
          </div>
        </template>
      </a-card-meta>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import {
  IconThumbUp,
  IconShareInternal,
  IconMore,
} from "@arco-design/web-vue/es/icon";
import { defineProps, withDefaults } from "vue";
import { useRouter } from "vue-router";
import { AppProps } from "@/types/appProps";

const props = withDefaults(defineProps<AppProps>(), {
  app: () => {
    return {};
  },
});

const router = useRouter();

const switchDetail = () => {
  router.push(`/app/detail/${props.app.id}`);
};
</script>
<style scoped>
.innerCard {
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
