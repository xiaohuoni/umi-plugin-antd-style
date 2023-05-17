import { RuntimeAntdConfig, RuntimeAntdStyleConfig } from "umi";

export const antd: RuntimeAntdConfig = (memo) => {
  memo.appConfig ??= {};
  memo.appConfig.message ??= {};
  memo.appConfig.message.duration = 5;

  return memo;
};

export const antdStyle: RuntimeAntdStyleConfig = (memo) => {
  memo.appearance = "dark";
  return memo;
};
