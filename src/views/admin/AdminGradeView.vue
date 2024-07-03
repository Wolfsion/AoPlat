<template>
  <div class="adminGradeView">
    <a-form
      :model="formSearchParams"
      :style="{
        justifyContent: 'center',
        marginBottom: '20px',
      }"
      label-align="left"
      auto-label-width
      layout="inline"
      @submit="searchGrade"
    >
      <a-form-item field="resultName" label="结果名称">
        <a-input
          allow-clear
          v-model="formSearchParams.resultName"
          placeholder="请输入评分名"
        />
      </a-form-item>
      <a-form-item field="resultDesc" label="结果描述">
        <a-input
          allow-clear
          v-model="formSearchParams.resultDesc"
          placeholder="请输入评分描述"
        />
      </a-form-item>
      <a-form-item field="appId" label="应用id">
        <a-input
          allow-clear
          v-model="formSearchParams.appId"
          placeholder="请输入应用id"
        />
      </a-form-item>
      <a-form-item field="userId" label="用户id">
        <a-input
          allow-clear
          v-model="formSearchParams.userId"
          placeholder="请输入用户id"
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" style="width: 120px">
          搜索
        </a-button>
      </a-form-item>
    </a-form>
    <a-table
      :columns="gradeColumns"
      :data="dataSource"
      :pagination="{
        showTotal: true,
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total,
      }"
      @page-change="onPageChange"
    >
      <template #resultPicture="{ record }">
        <a-image width="64" :src="record.resultPicture" />
      </template>
      <template #createTime="{ record }">
        {{ dayjs(record.createTime).format("YYYY-MM-DD HH:mm:ss") }}
      </template>
      <template #updateTime="{ record }">
        {{ dayjs(record.createTime).format("YYYY-MM-DD HH:mm:ss") }}
      </template>
      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="updateScoringResult(record)"
            >修改
          </a-button>
          <a-button status="danger" @click="deleteScoringResult(record)"
            >删除
          </a-button>
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import API from "@/api";
import {
  deleteScoringResultUsingPost,
  listScoringResultVoByPageUsingPost,
} from "@/api/scoringResultController";
import message from "@arco-design/web-vue/es/message";
import { dayjs } from "@arco-design/web-vue/es/_utils/date";

const dataSource = ref<API.ScoringResultVO[]>([]);
const total = ref<number>();
const formSearchParams = ref<API.ScoringResultQueryRequest>({});
const initSearchParams = {
  pageSize: 5,
  current: 1,
};

const searchParams = ref<API.ScoringResultQueryRequest>({
  ...initSearchParams,
  ...formSearchParams.value,
});

const gradeColumns = [
  {
    title: "ID",
    dataIndex: "id",
  },
  {
    title: "评分名",
    dataIndex: "resultName",
  },
  {
    title: "评分图像",
    dataIndex: "resultPicture",
    slotName: "resultPicture",
  },
  {
    title: "评分简介",
    dataIndex: "resultDesc",
  },
  {
    title: "分类属性",
    dataIndex: "resultProp",
  },
  {
    title: "评分范围",
    dataIndex: "resultScoreRange",
  },
  {
    title: "应用id",
    dataIndex: "appId",
  },
  {
    title: "用户id",
    dataIndex: "userId",
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    slotName: "createTime",
  },
  {
    title: "更新时间",
    dataIndex: "updateTime",
    slotName: "updateTime",
  },
  {
    title: "操作",
    slotName: "optional",
  },
];

const refreshData = async () => {
  const res = await listScoringResultVoByPageUsingPost(searchParams.value);
  if (res.data.code === 0) {
    dataSource.value = res.data.data?.records || [];
    total.value = Number(res.data.data?.total || 0);
  } else {
    message.error("获取数据失败");
  }
};

watchEffect(() => {
  refreshData();
});

const updateScoringResult = (record: API.ScoringResult) => {
  console.log("updateData", record);
};

const deleteScoringResult = async (record: API.ScoringResult) => {
  const res = await deleteScoringResultUsingPost({ id: record.id });
  if (res.data.code === 0) {
    await refreshData();
  } else {
    message.error("删除失败");
  }
};

const searchGrade = async () => {
  searchParams.value = {
    ...initSearchParams,
    ...formSearchParams.value,
  };
};

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};
</script>

<style scoped>
.adminGradeView {
  height: 90vh;
}
</style>
