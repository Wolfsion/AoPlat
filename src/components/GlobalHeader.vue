<template>
  <a-row class="grid-demo" :wrap="false" align="center">
    <a-col flex="auto">
      <div class="menu-demo">
        <a-menu
          mode="horizontal"
          :default-selected-keys="selectKeys"
          @menu-item-click="doMenuClick"
        >
          <a-menu-item
            key="0"
            :style="{ padding: 0, marginRight: '38px' }"
            disabled
          >
            <div class="title-bar">
              <img class="logo" src="../assets/logo.png" />
              <div class="title">AoPlat</div>
            </div>
          </a-menu-item>
          <a-menu-item v-for="item in visuableRoutes" :key="item.path">
            {{ item.name }}
          </a-menu-item>
        </a-menu>
      </div>
    </a-col>
    <a-col flex="100px">
      <div v-if="loginUserStore.loginUser.id">
        <AvatarDropdown :user="loginUserStore.loginUser ?? {}" />
        <!--{{ loginUserStore.loginUser.userName ?? "匿名用户" }}-->
      </div>
      <div v-else>
        <a-button type="primary" href="/user/login">登录</a-button>
      </div>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { routes } from "@/router/routes";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useLoginUserStore } from "@/store/userStore";
import checkAccess from "@/access/checkAccess";
import AvatarDropdown from "@/components/AvatarDropdown.vue";

const router = useRouter();
const selectKeys = ref(["/"]);

const loginUserStore = useLoginUserStore();
loginUserStore.fetchUser();

router.afterEach((to) => {
  selectKeys.value = [to.path];
});

const visuableRoutes = computed(() => {
  return routes.filter((item) => {
    if (item.meta?.hideInMenu) {
      return false;
    }

    return checkAccess(loginUserStore.loginUser, item.meta?.access as string);
  });
});

const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};
</script>

<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}

.title {
  margin-left: 16px;
  color: black;
}

.logo {
  height: 66px;
  margin-top: 10px;
}
</style>
