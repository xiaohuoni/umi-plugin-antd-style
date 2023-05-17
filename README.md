# umi-plugin-antd-style

在 umi 中快速接入 antd-style 的实验性插件，欢迎试用并提出修改意见，最终版将会发布在官方组织中。

可以和 max 集成使用和官方的 antd 插件结合使用效果更佳。

## 使用

安装依赖 

```bash
pnpm i umi-plugin-antd-style
```

增加使用插件配置，在 config/config.ts 或者 .umirc.ts 文件中编写配置

```ts
import { defineConfig } from "umi";

export default defineConfig({
  plugins: [require.resolve("umi-plugin-antd-style")],
  // 配置开启
  antdStyle: {

  } as ['antd-style'].ThemeProviderProps
});
```

## 配置

配置，在 config/config.ts 或者 .umirc.ts 文件中编写配置

```ts
import { defineConfig } from "umi";

export default defineConfig({
  antdStyle: {
    // 在这里配置所有的默认值，会被运行时配置修改
  } as ['antd-style'].ThemeProviderProps
});
```

如果需要配置一些使用到 react 的配置，可以在运行时 src/app.ts 中配置 antdStyle

```ts
import { RuntimeAntdStyleConfig } from "umi";

export const antdStyle: RuntimeAntdStyleConfig = (memo) => {
  memo.appearance = "dark";
  return memo;
};
```

## 动态切换主题

```tsx
import { useThemeConfig } from "umi";
import {
  Button,
  Space,
} from "antd";

export default function Page() {
  const { themeConfig, setThemeConfig } = useThemeConfig();
  console.log("themeConfig", themeConfig);

  return (
    <Layout>
      <h1>with antd-style</h1>
      <Space>
        <Button
          onClick={() => {
            setThemeConfig({
              ...themeConfig,
              appearance:
                themeConfig?.appearance === "light" ? "dark" : "light",
            });
          }}
        >
          切换主题
        </Button>
      </Space>
    </Layout>
  );
}
```

## 约定

- 所有的配置会直接透传给 ThemeProvider，没有对配置做校验，是为了后续 api 变更
- 优先使用用户项目中安装的 antd-style 版本

理论上，用户可以通过升级项目中的 antd-style 版本和修改配置来完成变更，不需要等插件修改。

更多 api 请参考 antd-style 的官网 https://ant-design.github.io/antd-style/api/theme-provider
