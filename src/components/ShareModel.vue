<template>
  <div class="shareModel">
    <a-modal v-model:visible="visible" @ok="openModel" @cancel="closeModel">
      <template #title> {{ props.title }}</template>
      <h4 style="margin-top: 0">复制分享链接</h4>
      <a-typography-paragraph copyable>
        {{ props.urlLink }}
      </a-typography-paragraph>
      <h4>手机扫码查看</h4>
      <a-image :src="codeLink" />
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, withDefaults, defineExpose, defineProps } from "vue";
import { AppShareProps } from "@/types/appProps";
// @ts-ignore
import QRCode from "qrcode";
import message from "@arco-design/web-vue/es/message";

const props = withDefaults(defineProps<AppShareProps>(), {
  urlLink: () => {
    return `${window.location.protocol}//${window.location.host}`;
  },
  title: () => {
    return "分享";
  },
});

const visible = ref(false);
const codeLink = ref("");

QRCode.toDataURL(props.urlLink)
  .then((url: string) => {
    codeLink.value = url;
  })
  .catch((err: any) => {
    message.error(err);
  });

const openModel = () => {
  visible.value = true;
};
const closeModel = () => {
  visible.value = false;
};

defineExpose({ openModel });
</script>

<style scoped>
.shareModel {
}
</style>
