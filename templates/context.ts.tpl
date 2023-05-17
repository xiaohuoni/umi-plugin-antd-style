import React from "react";
import { ThemeProviderProps, ThemeProvider } from "{{{pkgPath}}}";
import { ApplyPluginsType } from "umi";
import { getPluginManager } from "../core/plugin";

interface ThemeContextProps {
  themeConfig: ThemeProviderProps;
  setThemeConfig: React.Dispatch<ThemeProviderProps>;
}

export const ThemeContext = React.createContext<ThemeContextProps>(
  {} as ThemeContextProps
);

export const Theme = ({ rootContainer }) => {
  const finalConfigProvider = getPluginManager().applyPlugins({
    key: "antdStyle",
    type: ApplyPluginsType.modify,
    initialValue: {
        ...{{{antdStyle}}},
    },
  });
  const [themeConfig, setThemeConfig] = React.useState(finalConfigProvider);

  return (
    <ThemeContext.Provider value={ { themeConfig, setThemeConfig } }>
      <ThemeProvider {...themeConfig}>{rootContainer}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
