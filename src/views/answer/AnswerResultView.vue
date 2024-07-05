<template>
  <div class="answerResultView">
    <a-card class="singleApp" hoverable>
      <a-row class="grid-demo" style="margin-bottom: 16px">
        <a-col flex="auto" class="showContent">
          <h2>{{ answer.resultName }}</h2>
          <p>结果评价: {{ answer.resultDesc }}</p>
          <p v-if="answer.resultScore">得分: {{ answer.resultScore }}</p>
          <p>应用类型: {{ APP_TYPE_MAP[answer.appType] }}</p>
          <p>
            评分策略: {{ APP_SCORING_STRATEGY_MAP[answer.scoringStrategy] }}
          </p>
          <p>
            <a-space>
              答题人：
              <div :style="{ display: 'flex', alignItems: 'center' }">
                <a-avatar
                  :size="24"
                  :image-url="answer.user?.userAvatar"
                  :style="{ marginRight: '8px' }"
                />
                <a-typography-text
                  >{{ answer.user?.userName ?? "匿名" }}
                </a-typography-text>
              </div>
            </a-space>
          </p>
          <p>
            答题时间：{{
              dayjs(answer.createTime).format("YYYY-MM-DD HH:mm:ss")
            }}
          </p>
          <a-space size="large">
            <a-button type="primary" :href="`/answer/add/${answer.appId}`">
              再次答题
            </a-button>
          </a-space>
        </a-col>
        <a-col flex="320px">
          <a-image width="100%" :src="answer.resultPicture" />
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, watchEffect, withDefaults } from "vue";
import API from "@/api";
import message from "@arco-design/web-vue/es/message";
import { APP_SCORING_STRATEGY_MAP, APP_TYPE_MAP } from "@/types/appEnum";
import { dayjs } from "@arco-design/web-vue/es/_utils/date";
import { AnswerDetailProps } from "@/types/answerProps";
import { getUserAnswerVoByIdUsingGet } from "@/api/userAnswerController";

const props = withDefaults(defineProps<AnswerDetailProps>(), {
  resultId: "",
});

const answer = ref<API.UserAnswerVO>({});
const refreshData = async () => {
  if (!props.resultId) {
    return;
  }

  const res = await getUserAnswerVoByIdUsingGet({ id: props.resultId as any });
  if (res.data.code === 0) {
    answer.value = res.data.data || {};
  } else {
    message.error("获取回答失败 " + res.data.message);
  }
};

watchEffect(() => {
  refreshData();
});
</script>
<style scoped>
.answerResultView .showContent > * {
  margin-bottom: 24px;
}
</style>
