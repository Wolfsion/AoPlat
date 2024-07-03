<template>
  <div class="homeView">
    <div class="searchBar">
      <a-input-search
        :style="{
          justifyContent: 'center',
          width: '320px',
        }"
        placeholder="快速发现答题应用"
        button-text="搜索"
        size="large"
        search-button
      />
    </div>
    <a-list
      class="list-la-action-layout"
      :grid-props="{ gutter: [20, 20], sm: 24, md: 12, lg: 8, xl: 6 }"
      :bordered="false"
      :data="dataSource"
      :pagination-props="{
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total,
      }"
      @page-change="onPageChange"
    >
      <template #item="{ item }">
        <AppCard :app="item" />
      </template>
    </a-list>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import AppCard from "@/components/AppCard.vue";
import message from "@arco-design/web-vue/es/message";
import API from "@/api";
import { listAppVoByPageUsingPost } from "@/api/appController";
import { REVIEW_STATUS_ENUM } from "@/types/appEnum";

const dataSource = ref<API.AppVO[]>([]);
const total = ref<number>();
const initSearchParams = {
  pageSize: 4,
  current: 1,
};
const searchParams = ref<API.AppQueryRequest>({
  ...initSearchParams,
});

const refreshData = async () => {
  const params = {
    reviewStatus: REVIEW_STATUS_ENUM.PASS,
    ...searchParams.value,
  };

  const res = await listAppVoByPageUsingPost(params);
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

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};
</script>

<style scoped>
.homeView {
  height: 95vh;
}

.homeView .searchBar {
  display: flex;
  justify-content: center;
  margin-bottom: 28px;
}

.list-la-action-layout .image-area {
  width: 183px;
  height: 119px;
  overflow: hidden;
  border-radius: 2px;
}

.list-la-action-layout .list-la-item {
  padding: 20px 0;
  border-bottom: 1px solid var(--color-fill-3);
}

.list-la-action-layout .image-area img {
  width: 100%;
}

.list-la-action-layout .arco-list-item-action .arco-icon {
  margin: 0 4px;
}
</style>
