<template>
  <div class="appAddView">
    <h2 style="margin-bottom: 32px">设置应用</h2>
    <a-form
      :model="form"
      :style="{ width: '480px' }"
      label-align="left"
      auto-label-width
      @submit="submitApp"
    >
      <a-form-item field="appName" label="应用名">
        <a-input v-model="form.appName" placeholder="请输入应用名" />
      </a-form-item>
      <a-form-item field="appDesc" label="应用描述">
        <a-input v-model="form.appDesc" placeholder="请输入应用描述" />
      </a-form-item>
      <a-form-item field="appIcon" label="应用图标">
        <!--        <ImgUploader-->
        <!--          biz="app_icon"-->
        <!--          :value="form.appIcon"-->
        <!--          :onChange="(url: string) => (form.appIcon = url)"-->
        <!--        />-->
        <a-input v-model="form.appIcon" placeholder="请输入应用图标" />
      </a-form-item>
      <a-form-item field="appType" label="应用类型">
        <a-select
          v-model="form.appType"
          :style="{ width: '320px' }"
          placeholder="请选择应用类型"
        >
          <a-option
            v-for="(value, key) of APP_TYPE_MAP"
            :value="Number(key)"
            :label="value"
            :key="`appType-${key}`"
          />
        </a-select>
      </a-form-item>
      <a-form-item field="scoringStrategy" label="评分策略">
        <a-select
          v-model="form.scoringStrategy"
          :style="{ width: '320px' }"
          placeholder="请选择评分策略"
        >
          <a-option
            v-for="(value, key) of APP_SCORING_STRATEGY_MAP"
            :value="Number(key)"
            :label="value"
            :key="`scoringStrategy-${key}`"
          />
        </a-select>
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
import { ref, defineProps, withDefaults, watchEffect } from "vue";
import API from "@/api";
import { useRouter } from "vue-router";
import { APP_SCORING_STRATEGY_MAP, APP_TYPE_MAP } from "@/types/appEnum";
import ImgUploader from "@/components/ImgUploader.vue";
import {
  addAppUsingPost,
  editAppUsingPost,
  getAppVoByIdUsingGet,
} from "@/api/appController";
import message from "@arco-design/web-vue/es/message";
import AppVO = API.AppVO;
import { AppDetailProps } from "@/types/appProps";

const props = withDefaults(defineProps<AppDetailProps>(), {
  appId: "",
});

const form = ref({
  appName: "",
  appDesc: "",
  appIcon: "",
  appType: 0,
  scoringStrategy: 0,
} as API.AppAddRequest);

const router = useRouter();

const oldApp = ref<AppVO>();
const refreshData = async () => {
  if (props.appId) {
    const res = await getAppVoByIdUsingGet({ id: props.appId as any });
    if (res.data.code === 0) {
      oldApp.value = res.data.data;
      form.value = res.data.data ?? form.value;
    } else {
      message.error("获取数据失败" + res.data.message);
    }
  }
};

watchEffect(() => {
  refreshData();
});

const submitApp = async () => {
  let res: any;
  if (props.appId) {
    res = await editAppUsingPost({ ...form.value, id: props.appId as any });
  } else {
    res = await addAppUsingPost(form.value);
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
.appAddView {
}
</style>
