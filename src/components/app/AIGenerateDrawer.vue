<template>
  <div class="aiGenerateDrawer">
    <a-button type="outline" @click="handleClick">AI生成题目</a-button>
    <a-drawer
      :width="340"
      :visible="visible"
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
          <a-button
            type="primary"
            html-type="generateQs"
            style="width: 120px"
            :loading="loading"
            :footer="true"
          >
            {{ loading ? "生成中" : "AI一键生成" }}
          </a-button>
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
</script>

<style scoped>
.aiGenerateDrawer {
}
</style>
