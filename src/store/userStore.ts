import { defineStore } from "pinia";
import { ref } from "vue";
import { getLoginUserUsingGet } from "@/api/userController";
import ACCESS_ENUM from "@/access/accessEnum";

export const useLoginUserStore = defineStore("counter", () => {
  const loginUser = ref<API.UserVO>({
    userName: "未登录",
  });

  function setUser(UserVO: API.UserVO) {
    loginUser.value = UserVO;
  }

  function clearUser() {
    loginUser.value = {
      userRole: ACCESS_ENUM.NOT_LOGIN,
    };
  }

  async function fetchUser() {
    const res = await getLoginUserUsingGet();
    if (res.data.code == 0 && res.data.data) {
      loginUser.value = res.data.data;
    } else {
      // setTimeout(() => {
      //   loginUser.value = {
      //     id: 1,
      //     userName: "测试用户",
      //     userRole: ACCESS_ENUM.ADMIN,
      //   };
      // }, 3000);

      // 标识数据，避免每次路由时都尝试获取历史登录信息
      loginUser.value = {
        userRole: ACCESS_ENUM.NOT_LOGIN,
      };
    }
  }

  return {
    loginUser,
    setUser,
    clearUser,
    fetchUser,
  };
});
