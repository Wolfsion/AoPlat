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

  async function fetchUser() {
    const res = await getLoginUserUsingGet();
    if (res.data.code == 0 && res.data.data) {
      loginUser.value = res.data.data;
    } else {
      loginUser.value = {
        userRole: ACCESS_ENUM.NOT_LOGIN,
      };
    }
  }

  return {
    loginUser,
    setUser,
    fetchUser,
  };
});
