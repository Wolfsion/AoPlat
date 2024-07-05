<template>
  <div class="appAddQView">
    <h2>设置题目</h2>
    <a-form
      :model="form"
      :style="{ width: '480px' }"
      label-align="left"
      auto-label-width
      @submit="submitQuestions"
    >
      <a-form-item label="应用id"> {{ props.appId }}</a-form-item>
      <a-form-item label="题目列表" :content-flex="false" :merge-props="false">
        <a-button @click="addQuestionItem(form.length)">添加题目</a-button>
        <div v-for="(item, index) in form" :key="index" class="qsList">
          <a-space size="large">
            <h3>题目.{{ index + 1 }}</h3>
            <a-button size="small" @click="addQuestionItem(index + 1)">
              添加
            </a-button>
            <a-button
              size="small"
              status="danger"
              @click="delQuestionItem(index)"
            >
              删除
            </a-button>
          </a-space>
          <a-form-item field="title" label="标题">
            <a-input v-model="item.title" placeholder="请输入标题" />
          </a-form-item>
          <a-form-item
            label="选项列表"
            :content-flex="false"
            :merge-props="false"
          >
            <a-button
              @click="addQuestionItemOption(item, item.options?.length || 0)"
            >
              添加选项
            </a-button>
            <div
              v-for="(option, indexOption) in item.options"
              :key="indexOption"
            >
              <a-space size="large">
                <h3>选项.{{ indexOption + 1 }}</h3>
                <a-button
                  size="mini"
                  @click="addQuestionItemOption(item, indexOption + 1)"
                >
                  添加选项
                </a-button>
                <a-button
                  size="mini"
                  status="danger"
                  @click="delQuestionItemOption(item, indexOption)"
                >
                  删除选项
                </a-button>
              </a-space>
              <a-form-item field="key" label="选项序号">
                <a-input
                  v-model="option.key"
                  placeholder="请输入选项序号(例如: A,B)"
                />
              </a-form-item>
              <a-form-item field="value" label="选项内容">
                <a-input v-model="option.value" placeholder="请输入选项内容" />
              </a-form-item>
              <a-form-item field="score" label="选项分数">
                <a-input-number
                  v-model="option.score"
                  placeholder="请输入选项分数(无则忽略)"
                />
              </a-form-item>
              <a-form-item field="result" label="选项属性">
                <a-input
                  v-model="option.result"
                  placeholder="请输入选项属性(无则忽略)"
                />
              </a-form-item>
            </div>
          </a-form-item>
        </div>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" style="width: 120px">
          提交
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, watchEffect, withDefaults } from "vue";
import API from "@/api";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { AppDetailProps } from "@/types/appProps";
import {
  addQuestionUsingPost,
  editQuestionUsingPost,
  listQuestionVoByPageUsingPost,
} from "@/api/questionController";

const router = useRouter();
const props = withDefaults(defineProps<AppDetailProps>(), {
  appId: "",
});

const form = ref<API.QuestionItemDTO[]>([]);

const addQuestionItem = (index: number) => {
  form.value.splice(index, 0, {});
};

const delQuestionItem = (index: number) => {
  form.value.splice(index, 1);
};

const addQuestionItemOption = (
  question: API.QuestionItemDTO,
  index: number
) => {
  if (!question.options) {
    question.options = [];
  }
  question.options.splice(index, 0, {});
};

const delQuestionItemOption = (
  question: API.QuestionItemDTO,
  index: number
) => {
  if (!question.options) {
    question.options = [];
  }
  question.options.splice(index, 1);
};

const oldQuestion = ref<API.QuestionVO>({});

const refreshData = async () => {
  if (props.appId) {
    const res = await listQuestionVoByPageUsingPost({
      appId: props.appId as any,
      current: 1,
      pageSize: 1,
      sortField: "createTime",
      sortOrder: "descend",
    });

    if (res.data.code === 0 && res.data.data?.records) {
      oldQuestion.value = res.data.data?.records[0] ?? {};
      if (oldQuestion.value) {
        form.value = oldQuestion.value.questionContent ?? [];
      }
    } else {
      message.error("获取题目数据失败" + res.data.message);
    }
  }
};

watchEffect(() => {
  refreshData();
});

const submitQuestions = async () => {
  if (!props.appId || !form.value) {
    return;
  }
  let res: any;
  if (!oldQuestion.value.id) {
    res = await addQuestionUsingPost({
      appId: props.appId as any,
      questionContent: form.value,
    });
  } else {
    res = await editQuestionUsingPost({
      id: oldQuestion.value.id,
      questionContent: form.value,
    });
  }

  if (res.data.code === 0) {
    message.info("操作成功，即将跳转返回详情页。");
    setTimeout(() => {
      router.push(`/app/detail/${props.appId || res.data.data}`);
    }, 3000);
  } else {
    message.error("操作失败" + res.data.message);
  }
};
</script>

<style scoped>
.appAddQView h2 {
  margin-bottom: 16px;
}

.appAddQView .qsList > * {
  margin-bottom: 24px;
}
</style>
