import { RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import UserLayout from "@/layouts/UserLayout.vue";
import AboutView from "@/views/AboutView.vue";
import ACCESS_ENUM from "@/access/accessEnum";
import NoAuthView from "@/views/NoAuthView.vue";
import UserLoginView from "@/views/user/UserLoginView.vue";
import UserRegisterView from "@/views/user/UserRegisterView.vue";
import AdminUserView from "@/views/admin/AdminUserView.vue";
import AdminAppView from "@/views/admin/AdminAppView.vue";
import AdminAnswerView from "@/views/admin/AdminAnswerView.vue";
import AdminGradeView from "@/views/admin/AdminGradeView.vue";
import AdminQuestionView from "@/views/admin/AdminQuestionView.vue";
import AppDetailView from "@/views/app/AppDetailView.vue";
import AppAddView from "@/views/app/AppAddView.vue";
import AppAddQuestionView from "@/views/app/AppAddQuestionView.vue";
import AppAddGradeView from "@/views/app/AppAddGradeView.vue";
import AnswerResultView from "@/views/answer/AnswerResultView.vue";
import AnswerAddView from "@/views/answer/AnswerAddView.vue";
import MyAnswerView from "@/views/answer/MyAnswerView.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "主页",
    component: HomeView,
    meta: {
      hideInMenu: false,
    },
  },
  {
    path: "/answer/add/:appId",
    name: "答题",
    component: AnswerAddView,
    props: true,
    meta: {
      hideInMenu: true,
      access: ACCESS_ENUM.USER,
    },
  },
  {
    path: "/answer/result/:resultId",
    name: "答题结果",
    component: AnswerResultView,
    props: true,
    meta: {
      hideInMenu: true,
      access: ACCESS_ENUM.USER,
    },
  },
  {
    path: "/answer/my",
    name: "我的答题",
    component: MyAnswerView,
    meta: {
      hideInMenu: true,
      access: ACCESS_ENUM.USER,
    },
  },
  {
    path: "/app/add",
    name: "创建应用",
    component: AppAddView,
  },
  {
    path: "/app/add/:appId",
    name: "修改应用",
    props: true,
    component: AppAddView,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/app/add_question/:appId",
    name: "创建题目",
    component: AppAddQuestionView,
    props: true,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/app/add_grade/:appId",
    name: "创建评分",
    component: AppAddGradeView,
    props: true,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/app/detail/:appId",
    name: "应用详情页",
    props: true,
    component: AppDetailView,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/admin/user",
    name: "用户管理",
    component: AdminUserView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
    },
  },
  {
    path: "/admin/app",
    name: "应用管理",
    component: AdminAppView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
    },
  },
  {
    path: "/admin/question",
    name: "题目管理",
    component: AdminQuestionView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
    },
  },
  {
    path: "/admin/answer",
    name: "答题管理",
    component: AdminAnswerView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
    },
  },
  {
    path: "/admin/grade",
    name: "评分管理",
    component: AdminGradeView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
    },
  },
  {
    path: "/noAuth",
    name: "无权限",
    component: NoAuthView,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/user",
    name: "用户",
    component: UserLayout,
    meta: {
      hideInMenu: true,
    },
    children: [
      {
        path: "/user/login",
        name: "用户登录",
        component: UserLoginView,
      },
      {
        path: "/user/register",
        name: "用户注册",
        component: UserRegisterView,
      },
    ],
  },
  {
    path: "/about",
    name: "关于",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => AboutView,
    meta: {
      hideInMenu: false,
    },
  },
];
