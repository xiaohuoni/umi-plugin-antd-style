import { IApi } from "umi";
import { winPath } from "@umijs/utils";
import { withTmpPath } from "./withTmpPath";
import { resolveProjectDep } from "./resolveProjectDep";
import { join, dirname } from "path";
import { TEMPLATES_DIR } from "./constants";
const DIR_NAME = "plugin-antd-style";

export default (api: IApi) => {
  let pkgPath: string;
  pkgPath =
    resolveProjectDep({
      pkg: api.pkg,
      cwd: api.cwd,
      dep: "antd-style",
    }) || dirname(require.resolve("antd-style/package.json"));

  api.describe({
    key: "antdStyle",
    config: {
      schema({ zod }) {
        return zod.object({});
      },
    },
    enableBy: api.EnableBy.config,
  });
  api.modifyConfig((memo) => {
    // antd-style import
    memo.alias["antd-style"] = pkgPath;
    return memo;
  });

  api.onGenerateFiles(() => {
    const antdStyle = api.config.antdStyle || {};
    api.writeTmpFile({
      path: `runtime.tsx`,
      context: {},
      tplPath: winPath(join(TEMPLATES_DIR, "runtime.ts.tpl")),
    });
    api.writeTmpFile({
      path: `context.tsx`,
      context: {
        pkgPath,
        antdStyle: JSON.stringify(antdStyle),
      },
      tplPath: winPath(join(TEMPLATES_DIR, "context.ts.tpl")),
    });
    api.writeTmpFile({
      path: `index.tsx`,
      content: `import React from "react";
      import { ThemeContext } from "./context";
      export function useThemeConfig() {
        return React.useContext(ThemeContext);
      }
      export * from '${pkgPath}';`,
    });
    api.writeTmpFile({
      path: "types.d.ts",
      content: `import { ThemeProviderProps } from '${pkgPath}';
      export * from '${pkgPath}';
      export type RuntimeAntdStyleConfig = (
        memo: Omit<ThemeProviderProps<any>, "children">
      ) => Omit<ThemeProviderProps<any>, "children">;
      `,
    });
  });
  api.addRuntimePlugin(() => {
    return [withTmpPath({ api, path: "runtime.tsx" })];
  });
  // 注册runtime配置
  api.addRuntimePluginKey(() => ["antdStyle"]);
};
