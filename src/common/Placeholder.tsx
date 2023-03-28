import { makeStyles, tokens } from '@fluentui/react-components';

export interface PlaceholderProps {
  width?: string;
  height?: string;
}

const useStyles = makeStyles({
  main: {
    backgroundColor: tokens.colorNeutralBackground2,
  },
});

function Placeholder({ width, height }: PlaceholderProps) {
  const styles = useStyles();

  const hardStyles: React.CSSProperties = {};

  if (width) {
    hardStyles.width = width;
  }
  if (height) {
    hardStyles.height = height;
  }

  return <div style={hardStyles} className={styles.main}></div>;
}

export default Placeholder;
