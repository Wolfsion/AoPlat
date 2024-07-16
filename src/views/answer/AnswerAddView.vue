<template>
  <div class="appAddGradeView">
    <a-card>
      <h1 style="margin-bottom: 32px">{{ app?.appName }}</h1>
      <p>{{ app?.appDesc }}</p>
      <h2 style="margin-bottom: 16px">
        {{ curtOrder }}. {{ curtQuestion?.title }}
      </h2>
      <div>
        <a-radio-group
          direction="vertical"
          v-model="curtAnswer"
          :options="curtQuestionOptions"
          @change="saveAnswer"
        ></a-radio-group>
      </div>
      <div style="margin-top: 24px">
        <a-space size="large">
          <a-button
            v-if="curtOrder < question.length"
            :disabled="!curtAnswer"
            type="primary"
            circle
            @click="curtOrder += 1"
          >
            下一题
          </a-button>
          <a-button
            v-if="curtOrder === question.length"
            type="primary"
            circle
            :loading="loading"
            @click="submitAnswer()"
          >
            {{ loading ? "分析中" : "查看结果" }}
          </a-button>
          <a-button
            v-if="curtOrder > 1"
            type="primary"
            circle
            @click="curtOrder -= 1"
            >上一题
          </a-button>
        </a-space>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, withDefaults, watchEffect, computed } from "vue";
import API from "@/api";
import { useRouter } from "vue-router";
import { getAppVoByIdUsingGet } from "@/api/appController";
import message from "@arco-design/web-vue/es/message";
import { AppDetailProps } from "@/types/appProps";
import { listQuestionVoByPageUsingPost } from "@/api/questionController";
import {
  addUserAnswerUsingPost,
  generateUserAnswerIdUsingGet,
} from "@/api/userAnswerController";

const props = withDefaults(defineProps<AppDetailProps>(), {
  appId: () => {
    return "";
  },
});

const router = useRouter();

const app = ref<API.AppVO>();
const question = ref<API.QuestionItemDTO[]>([]);
const loading = ref(false);
const id = ref<number>(0);

const refreshAppAndQ = async () => {
  let res: any;
  if (props.appId) {
    res = await getAppVoByIdUsingGet({ id: props.appId as any });
    if (res.data.code === 0) {
      app.value = res.data.data;
    } else {
      message.error("获取应用失败" + res.data.message);
    }

    res = await listQuestionVoByPageUsingPost({
      appId: props.appId as any,
      current: 1,
      pageSize: 1,
      sortField: "createTime",
      sortOrder: "descend",
    });

    if (res.data.code === 0 && res.data.data?.records) {
      question.value = res.data.data?.records[0].questionContent;
    } else {
      message.error("获取题目失败" + res.data.message);
    }
  }
};

watchEffect(() => {
  refreshAppAndQ();
});

watchEffect(async () => {
  const res = await generateUserAnswerIdUsingGet();
  if (res.data.code === 0 && res.data.data) {
    id.value = res.data.data;
  } else {
    message.error("获取用户答题ID失败" + res.data.message);
  }
});

const curtOrder = ref<number>(1);
const curtQuestion = ref<API.QuestionItemDTO>();
const curtQuestionOptions = computed(() => {
  return curtQuestion.value?.options?.map((option) => {
    return {
      label: `${option.key}. ${option.value}`,
      value: option.key,
    };
  });
});
const curtAnswer = ref<string>();
const answerList = ref<string[]>([]);

watchEffect(() => {
  curtQuestion.value = question.value[curtOrder.value - 1];
  curtAnswer.value = answerList.value[curtOrder.value - 1];
});

const saveAnswer = () => {
  answerList.value[curtOrder.value - 1] = curtAnswer.value as string;
};

const submitAnswer = async () => {
  if (props.appId) {
    loading.value = true;
    const res = await addUserAnswerUsingPost({
      appId: props.appId as any,
      choices: answerList.value,
      id: id.value as any,
    });

    if (res.data.code === 0 && res.data.data) {
      router.push(`/answer/result/${res.data.data}`);
    } else {
      message.error("做题失败" + res.data.message);
    }
    loading.value = false;
  }
};
</script>

<style scoped>
.appAddGradeView {
}
</style>
