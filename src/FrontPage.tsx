import { makeStyles, Button, shorthands } from '@fluentui/react-components';
import Placeholder from './common/Placeholder';
import { NewsArea } from './news';

const useStyles = makeStyles({
  outer: {
    display: 'flex',
    flexDirection: 'column',
  },
  buttons: {
    ...shorthands.margin('auto'),
    width: '10rem',
    maxWidth: '100%',
  },
});

export interface FrontPageProps {
  onMapClick(): void;
}

function FrontPage({ onMapClick }: FrontPageProps) {
  const styles = useStyles();

  return (
    <div className={styles.outer}>
      <Placeholder height="4rem" />
      <div className={styles.buttons}>
        <Button onClick={onMapClick}>Open map</Button>
      </div>
      <NewsArea />
    </div>
  );
}
export default FrontPage;
