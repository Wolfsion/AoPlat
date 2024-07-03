// 审核状态枚举
const REVIEW_STATUS_ENUM = {
  // 待审核
  REVIEWING: 0,
  // 通过
  PASS: 1,
  // 拒绝
  REJECT: 2,
};

// 审核状态映射
const REVIEW_STATUS_MAP = {
  0: "待审核",
  1: "通过",
  2: "拒绝",
};

// 应用类型枚举
const APP_TYPE_ENUM = {
  // 得分类
  SCORE: 0,
  // 测评类
  TEST: 1,
};

// 应用类型映射
const APP_TYPE_MAP = {
  0: "得分类",
  1: "测评类",
};

// 应用评分策略枚举
const APP_SCORING_STRATEGY_ENUM = {
  // 自定义
  CUSTOM: 0,
  // AI
  AI: 1,
};

// 应用评分策略映射
const APP_SCORING_STRATEGY_MAP = {
  0: "自定义",
  1: "AI",
};

export {
  REVIEW_STATUS_ENUM,
  REVIEW_STATUS_MAP,
  APP_TYPE_ENUM,
  APP_TYPE_MAP,
  APP_SCORING_STRATEGY_ENUM,
  APP_SCORING_STRATEGY_MAP,
};
