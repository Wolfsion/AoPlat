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
            src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a20012a2d4d5b9db43dfc6a01fe508c0.png~tplv-uwbnlip3yd-webp.webp"
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
            <a-typography-text>{{ app.user?.userName }}</a-typography-text>
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
