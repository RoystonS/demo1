import { useCallback, useEffect, useState } from 'react';
import { FluentProvider, teamsLightTheme, teamsDarkTheme } from '@fluentui/react-components';

import styles from './App.module.scss';
import Map from './Map';
import FrontPage from './FrontPage';

type Page = 'front' | 'map';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const [page, setPage] = useState<Page>('front');

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  const handleFrontPageMapClick = useCallback(() => {
    setPage('map');
  }, []);

  const theme = darkMode ? teamsDarkTheme : teamsLightTheme;

  return (
    <FluentProvider className={styles.fluentUiRoot} theme={theme}>
      {page === 'map' ? <Map /> : null}
      {page === 'front' ? <FrontPage onMapClick={handleFrontPageMapClick} /> : null}
    </FluentProvider>
  );
}

export default App;
