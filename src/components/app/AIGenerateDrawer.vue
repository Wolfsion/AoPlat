<template>
  <div class="aiGenerateDrawer">
    <a-button type="outline" @click="handleClick">AI生成题目</a-button>
    <a-drawer
      :width="340"
      :visible="visible"
      :footer="false"
      @ok="handleOk"
      @cancel="handleCancel"
      unmountOnClose
      class="innerDrawer"
    >
      <a-form-item label="应用id"> {{ props.appId }}</a-form-item>
      <template #title> AI生成题目~</template>
      <a-form
        :model="form"
        label-align="left"
        auto-label-width
        @submit="generateQs"
        @submitAsync="generateQsAsync"
        style="margin-top: 20px"
      >
        <a-form-item field="questionCnt" label="题目数量">
          <a-input-number
            v-model="form.questionCnt"
            placeholder="请输入题目数量"
            :min="0"
            :max="20"
          />
        </a-form-item>
        <a-form-item field="optionCnt" label="选项数量">
          <a-input-number
            v-model="form.optionCnt"
            placeholder="请输入每道题的选项数量"
            :min="0"
            :max="6"
          />
        </a-form-item>
        <a-form-item>
          <a-space size="medium">
            <a-button
              type="primary"
              html-type="submit"
              style="width: 100px"
              :loading="loading"
              :footer="true"
            >
              {{ loading ? "生成中" : "AI一键生成" }}
            </a-button>
            <a-button
              type="primary"
              @click="generateQsAsync"
              style="width: 100px"
              :loading="loadingAsync"
              :footer="true"
            >
              {{ loadingAsync ? "生成中" : "AI实时生成" }}
            </a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </a-drawer>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, withDefaults } from "vue";
import { AppGenerateProps } from "@/types/appProps";
import { aiGenerateUsingPost } from "@/api/questionController";
import message from "@arco-design/web-vue/es/message";

const props = withDefaults(defineProps<AppGenerateProps>(), {
  appId: () => {
    return "";
  },
});

const visible = ref(false);
const form = ref({
  questionCnt: 10,
  optionCnt: 2,
});
const loading = ref(false);
const loadingAsync = ref(false);

const handleClick = () => {
  visible.value = true;
};
const handleOk = () => {
  visible.value = false;
};
const handleCancel = () => {
  visible.value = false;
};

const generateQs = async () => {
  if (props.appId && props.generateOnSuccess) {
    loading.value = true;
    const res = await aiGenerateUsingPost({
      appId: props.appId as any,
      ...form.value,
    });
    if (res.data.code === 0 && res.data.data && res.data.data?.length > 0) {
      props.generateOnSuccess(res.data.data);
      handleCancel();
    } else {
      message.error("AI生成失败" + res.data.message);
    }
    loading.value = false;
  }
};

const generateQsAsync = () => {
  if (props.appId) {
    loadingAsync.value = true;
    let first = true;

    const eventSource = new EventSource(
      "http://localhost:8101/api/question/ai_generate/sse" +
        `?appId=${props.appId}&optionCnt=${form.value.optionCnt}&questionCnt=${form.value.questionCnt}`
    );

    eventSource.onerror = function (event) {
      if (event.eventPhase === EventSource.CLOSED) {
        console.log("closing sse connection...");
        props.generateOnCloseAsync?.(event);
      }
      eventSource.close();
    };

    eventSource.onmessage = function (event) {
      if (first) {
        loadingAsync.value = false;
        first = false;
        handleCancel();
      }
      props.generateOnSuccessAsync?.(JSON.parse(event.data));
    };

    eventSource.onopen = function (event) {
      console.log("starting sse connection...");
    };
  }
};
</script>

<style scoped>
.aiGenerateDrawer {
}
</style>
