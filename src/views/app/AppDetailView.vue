<template>
  <div class="appDetailView">
    <a-card class="singleApp" hoverable>
      <a-row class="grid-demo" style="margin-bottom: 16px">
        <a-col flex="auto" class="showContent">
          <h2>{{ app.appName }}</h2>
          <p>{{ app.appDesc }}</p>
          <p>应用类型：{{ APP_TYPE_MAP[app.appType] }}</p>
          <p>评分策略：{{ APP_SCORING_STRATEGY_MAP[app.scoringStrategy] }}</p>
          <p>
            <a-space>
              作者：
              <div :style="{ display: 'flex', alignItems: 'center' }">
                <a-avatar
                  :size="24"
                  :image-url="app.user?.userAvatar"
                  :style="{ marginRight: '8px' }"
                />
                <a-typography-text
                  >{{ app.user?.userName ?? "匿名" }}
                </a-typography-text>
              </div>
            </a-space>
          </p>
          <p>
            创建时间：{{ dayjs(app.createTime).format("YYYY-MM-DD HH:mm:ss") }}
          </p>
          <a-space size="large">
            <a-button type="primary" :href="`/answer/${appId}`">
              开始答题
            </a-button>
            <a-button>分享应用</a-button>
            <a-button v-if="isMe" :href="`/app/add_question/${appId}`">
              设置题目
            </a-button>
            <a-button v-if="isMe" :href="`/app/add_grade/${appId}`">
              设置评分
            </a-button>
            <a-button v-if="isMe" :href="`/app/add/${appId}`">
              修改应用
            </a-button>
          </a-space>
        </a-col>
        <a-col flex="320px">
          <a-image width="100%" :src="app.appIcon" />
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, ref, watchEffect, withDefaults } from "vue";
import { AppDetailProps } from "@/types/appProps";
import API from "@/api";
import { getAppVoByIdUsingGet } from "@/api/appController";
import message from "@arco-design/web-vue/es/message";
import { APP_SCORING_STRATEGY_MAP, APP_TYPE_MAP } from "@/types/appEnum";
import { dayjs } from "@arco-design/web-vue/es/_utils/date";
import { useLoginUserStore } from "@/store/userStore";

const props = withDefaults(defineProps<AppDetailProps>(), {
  appId: () => {
    return "";
  },
});

const app = ref<API.AppVO>({});
const refreshData = async () => {
  if (!props.appId) {
    return;
  }
  const res = await getAppVoByIdUsingGet({ id: Number(props.appId) });
  if (res.data.code === 0) {
    app.value = res.data.data || {};
  } else {
    message.error("获取数据失败");
  }
};
watchEffect(() => {
  refreshData();
});

const loginUserStore = useLoginUserStore();
loginUserStore.fetchUser();

const isMe = computed(() => {
  return (
    loginUserStore.loginUser && loginUserStore.loginUser.id === app.value.userId
  );
});
</script>
<style scoped>
.appDetailView .showContent > * {
  margin-bottom: 24px;
}
</style>
