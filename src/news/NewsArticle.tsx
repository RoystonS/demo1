import {
  Body1,
  Caption1,
  Card,
  CardHeader,
  CardPreview,
  makeStyles,
  shorthands,
  tokens,
} from '@fluentui/react-components';

import { ClipboardTextLtr24Regular } from '@fluentui/react-icons';
import Placeholder from '../common/Placeholder';

export interface NewsArticleProps {
  title: string;
  message: string;
}

const useStyles = makeStyles({
  card: {
    ...shorthands.margin('auto'),
    width: '720px',
    maxWidth: '100%',
    marginBlockEnd: tokens.spacingVerticalM,
  },
  cardContent: {
    marginInlineStart: tokens.spacingHorizontalL,
  },
  cardInner: {
    display: 'flex',
    flexDirection: 'row',
  },
});

function NewsArticle({ title, message }: NewsArticleProps) {
  const styles = useStyles();

  return (
    <Card className={styles.card}>
      <CardHeader image={<ClipboardTextLtr24Regular />} header={<Body1>{title}</Body1>} />
      <CardPreview>
        <div className={styles.cardContent}>
          <div className={styles.cardInner}>
            <Body1>{message}</Body1>
            <Placeholder height="4rem" width="5rem" />
          </div>
        </div>
      </CardPreview>
    </Card>
  );
}

export default NewsArticle;
