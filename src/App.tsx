import { useCallback, useState } from 'react';
import { FluentProvider } from '@fluentui/react-components';

import styles from './App.module.scss';
import Map from './Map';
import FrontPage from './FrontPage';

import { useTheming } from './theming';

type Page = 'front' | 'map';

function App() {
  const [themeInfo] = useTheming();

  const [page, setPage] = useState<Page>('front');

  const handleFrontPageMapClick = useCallback(() => {
    setPage('map');
  }, []);

  return (
    <FluentProvider className={styles.fluentUiRoot} theme={themeInfo.getTheme()}>
      {page === 'map' ? <Map /> : null}
      {page === 'front' ? <FrontPage onMapClick={handleFrontPageMapClick} /> : null}
    </FluentProvider>
  );
}

export default App;
