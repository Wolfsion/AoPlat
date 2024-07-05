<template>
  <div class="avatorDropdown">
    <a-dropdown>
      <a-avatar :size="64" style="cursor: pointer">
        <img :alt="props.user.userName" :src="props.user.userAvatar" />
      </a-avatar>
      <template #content>
        <a-menu>
          <a-menu-item key="myAnswer" @click="switchMyAnswer()"
            >我的回答
          </a-menu-item>
          <a-menu-item key="logout" @click="userCurtLogout()">退出</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { UserProps } from "@/types/homeProps";
import { useRouter } from "vue-router";
import { userLogoutUsingPost } from "@/api/userController";
import message from "@arco-design/web-vue/es/message";
import { useLoginUserStore } from "@/store/userStore";

const router = useRouter();
const props = defineProps<UserProps>();
const loginUserStore = useLoginUserStore();

const userCurtLogout = async () => {
  const res = await userLogoutUsingPost();
  if (res.data.code === 0) {
    loginUserStore.clearUser();
    message.success("退出成功。");
  } else {
    message.error("退出失败 " + res.data.message);
  }
};

const switchMyAnswer = () => {
  router.push("/answer/my");
};
</script>

<style scoped>
.avatorDropdown {
}
</style>
