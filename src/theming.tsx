import { teamsDarkTheme, teamsHighContrastTheme, teamsLightTheme, Theme } from '@fluentui/react-components';
import { useEffect, useState } from 'react';

export type ThemeKey = 'teamsLight' | 'teamsDark' | 'teamsHighContrast' | 'auto';

export interface IThemeInfo {
  key: ThemeKey;
  name: string;
  getTheme: () => Theme;
}

export const AllThemes: IThemeInfo[] = [
  {
    key: 'auto',
    name: 'Autodetect',
    getTheme() {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? teamsDarkTheme : teamsLightTheme;
    },
  },
  {
    key: 'teamsLight',
    name: 'Teams Light',
    getTheme() {
      return teamsLightTheme;
    },
  },
  {
    key: 'teamsDark',
    name: 'Teams Dark',
    getTheme() {
      return teamsDarkTheme;
    },
  },
  {
    key: 'teamsHighContrast',
    name: 'Teams High Contrast',
    getTheme() {
      return teamsHighContrastTheme;
    },
  },
];

const STORAGE_KEY = 'theme';

const themeListeners = new Set<(themeKey: string) => void>();

export function useTheming() {
  const [themeKey, setThemeKey] = useState<ThemeKey>(() => (localStorage.getItem(STORAGE_KEY) ?? 'auto') as ThemeKey);

  function handleStorageChange(themeKey: string) {
    setThemeKey(themeKey as ThemeKey);
  }

  useEffect(() => {
    themeListeners.add(handleStorageChange);
    return () => {
      themeListeners.delete(handleStorageChange);
    };
  }, []);

  const themeInfo = AllThemes.find((t) => t.key === themeKey) ?? AllThemes[0];

  return [
    themeInfo,
    (newThemeKey: ThemeKey) => {
      localStorage.setItem(STORAGE_KEY, newThemeKey);
      for (const listener of themeListeners) {
        listener(newThemeKey);
      }
    },
  ] as const;
}
