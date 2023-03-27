import { useEffect, useState } from 'react';
import { FluentProvider, teamsLightTheme, teamsDarkTheme } from '@fluentui/react-components';

import styles from './App.module.scss';
import Map from './Map';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  const theme = darkMode ? teamsDarkTheme : teamsLightTheme;

  return (
    <FluentProvider className={styles.fluentUiRoot} theme={theme}>
      <Map />
    </FluentProvider>
  );
}

export default App;
