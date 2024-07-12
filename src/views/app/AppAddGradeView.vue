<template>
  <div class="appAddGradeView">
    <h2 style="margin-bottom: 32px">设置评分</h2>
    <a-form
      :model="form"
      :style="{ width: '480px' }"
      label-align="left"
      auto-label-width
      @submit="submitGrade"
    >
      <a-form-item label="应用id"> {{ props.appId }}</a-form-item>
      <a-form-item field="resultName" label="评分名">
        <a-input v-model="form.resultName" placeholder="请输入评分名" />
      </a-form-item>
      <a-form-item field="resultDesc" label="评分描述">
        <a-input v-model="form.resultDesc" placeholder="请输入评分描述" />
      </a-form-item>
      <a-form-item field="resultPicture" label="评分图标">
        <ImgUploader
          biz="scoring_result_picture"
          :value="form.resultPicture"
          :onChange="(url: string) => (form.resultPicture = url)"
        />
        <!--<a-input v-model="form.resultPicture" placeholder="请输入评分图像" />-->
      </a-form-item>
      <a-form-item field="resultProp" label="评分属性集">
        <a-input-tag
          v-model="form.resultProp"
          :style="{ width: '320px' }"
          placeholder="请输入评分属性集"
          allow-clear
        />
      </a-form-item>
      <a-form-item field="resultScoreRange" label="评分区间">
        <a-input-number
          v-model="form.resultScoreRange"
          placeholder="请输入评分范围最低值"
        />
      </a-form-item>
      <a-form-item>
        <a-space size="large">
          <a-button type="primary" html-type="submit" style="width: 120px">
            提交
          </a-button>
          <a-button status="danger" @click="clearResult()" style="width: 120px">
            清空
          </a-button>
          <a-button @click="backDetail()" style="width: 120px">
            返回详情页
          </a-button>
        </a-space>
      </a-form-item>
    </a-form>
    <h2>评分条目管理</h2>
    <GradeTable
      :appId="appId"
      :update-result="updateScoringResult"
      ref="gradeTable"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, withDefaults, watchEffect } from "vue";
import API from "@/api";
import { useRouter } from "vue-router";
import ImgUploader from "@/components/ImgUploader.vue";
import {
  addScoringResultUsingPost,
  editScoringResultUsingPost,
} from "@/api/scoringResultController";
import message from "@arco-design/web-vue/es/message";
import { AppDetailProps } from "@/types/appProps";
import GradeTable from "@/components/app/GradeTable.vue";

const router = useRouter();
const props = withDefaults(defineProps<AppDetailProps>(), {
  appId: "",
});
const gradeTable = ref();

const form = ref({
  resultName: "",
  resultDesc: "",
  resultPicture: "",
} as API.ScoringResultAddRequest);

const oldResultId = ref<string>();

const updateScoringResult = (result: API.ScoringResultVO) => {
  oldResultId.value = String(result.id);
  form.value = {
    resultName: result.resultName,
    resultDesc: result.resultDesc,
    resultPicture: result.resultPicture,
    resultProp: result.resultProp,
    resultScoreRange: result.resultScoreRange,
  };
};

const submitGrade = async () => {
  if (props.appId) {
    let res: any;
    if (oldResultId.value) {
      res = await editScoringResultUsingPost({
        id: oldResultId.value as any,
        ...form.value,
      });
    } else {
      res = await addScoringResultUsingPost({
        appId: props.appId as any,
        ...form.value,
      });
    }

    if (res.data.code === 0) {
      message.info("操作成功。");
    } else {
      message.error("操作失败 " + res.data.message);
    }
    if (gradeTable.value) {
      await gradeTable.value.refreshData();
      oldResultId.value = undefined;
    }
  }
};

const backDetail = () => {
  router.push(`/app/detail/${props.appId}`);
};

const clearResult = () => {
  form.value = {
    resultName: "",
    resultDesc: "",
    resultPicture: "https://picsum.photos/960/960",
  };
  oldResultId.value = undefined;
};
</script>

<style scoped>
.appAddGradeView {
}
</style>
