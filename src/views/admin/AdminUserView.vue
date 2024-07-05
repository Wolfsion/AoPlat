<template>
  <div class="adminUserView">
    <a-form
      :model="formSearchParams"
      :style="{
        justifyContent: 'center',
        marginBottom: '20px',
      }"
      label-align="left"
      auto-label-width
      layout="inline"
      @submit="searchUser"
    >
      <a-form-item field="userName" label="用户名">
        <a-input
          allow-clear
          v-model="formSearchParams.userName"
          placeholder="请输入用户名"
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" style="width: 120px">
          搜索
        </a-button>
      </a-form-item>
    </a-form>
    <a-table
      :columns="userColumns"
      :data="dataSource"
      :pagination="{
        showTotal: true,
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total,
      }"
      @page-change="onPageChange"
    >
      <template #userAvatar="{ record }">
        <a-image width="64" :src="record.userAvatar" />
      </template>
      <template #createTime="{ record }">
        {{ dayjs(record.createTime).format("YYYY-MM-DD HH:mm:ss") }}
      </template>
      <template #updateTime="{ record }">
        {{ dayjs(record.createTime).format("YYYY-MM-DD HH:mm:ss") }}
      </template>
      <template #optional="{ record }">
        <a-space>
          <!--          <a-button type="primary" @click="updateUser(record)">修改</a-button>-->
          <a-button status="danger" @click="deleteUser(record)">删除</a-button>
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import API from "@/api";
import {
  deleteUserUsingPost,
  listUserByPageUsingPost,
} from "@/api/userController";
import message from "@arco-design/web-vue/es/message";
import { dayjs } from "@arco-design/web-vue/es/_utils/date";

const dataSource = ref<API.User[]>([]);
const total = ref<number>();
const formSearchParams = ref<API.UserQueryRequest>({});
const initSearchParams = {
  pageSize: 5,
  current: 1,
};

const searchParams = ref<API.UserQueryRequest>({
  ...initSearchParams,
  ...formSearchParams.value,
});

const userColumns = [
  {
    title: "ID",
    dataIndex: "id",
  },
  {
    title: "账户",
    dataIndex: "userAccount",
  },
  {
    title: "用户名",
    dataIndex: "userName",
  },
  {
    title: "用户头像",
    dataIndex: "userAvatar",
    slotName: "userAvatar",
  },
  {
    title: "用户简介",
    dataIndex: "userProfile",
  },
  {
    title: "权限",
    dataIndex: "userRole",
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
  const res = await listUserByPageUsingPost(searchParams.value);
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

// const updateUser = (record: API.User) => {
//   console.log("updateData", record);
// };

const deleteUser = async (record: API.User) => {
  const res = await deleteUserUsingPost({ id: record.id });
  if (res.data.code === 0) {
    await refreshData();
  } else {
    message.error("删除失败");
  }
};

const searchUser = async () => {
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
.adminUserView {
  height: 90vh;
}
</style>
