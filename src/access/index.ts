import router from "@/router";
import { useLoginUserStore } from "@/store/userStore";
import ACCESS_ENUM from "@/access/accessEnum";
import checkAccess from "@/access/checkAccess";

router.beforeEach(async (to, from, next) => {
  const loginUserStore = useLoginUserStore();
  let loginUser = loginUserStore.loginUser;
  const needAccess = (to.meta?.access as string) ?? ACCESS_ENUM.NOT_LOGIN;

  // 页面第一次打开，尝试获取是否存在历史登录信息
  // 冗余判断loginUser，事实上loginUser不为空，健壮代码防止访问loginUser空指针异常
  // 如果loginUser.userRole不为空，则说明已知道登录与否，不需要反复确认
  if (!loginUser || !loginUser.userRole) {
    // 同步阻塞等待，有可能用户已经登录过了
    await loginUserStore.fetchUser();
    loginUser = loginUserStore.loginUser;
  }

  // 当前页面需要登录分支
  if (needAccess !== ACCESS_ENUM.NOT_LOGIN) {
    // 当前用户未登录分支
    // 冗余判断loginUser和loginUser.userRole，事实上不为空，健壮代码防止访问userRole空指针异常
    // 不为空，还需要判断值是否为未登录，知道登录与否和知道未登录是两码事
    if (
      !loginUser ||
      !loginUser.userRole ||
      loginUser.userRole === ACCESS_ENUM.NOT_LOGIN
    ) {
      next(`/user/login?redirect=${to.fullPath}`);
      return;
    }

    // 当前用户已登录分支，检查权限是否满足
    if (!checkAccess(loginUser, needAccess)) {
      next("/noAuth");
      return;
    }
  }

  next();
});
