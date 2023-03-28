import { Subtitle1 } from '@fluentui/react-components';
import NewsArticle from './NewsArticle';

interface INewsEntry {
  title: string;
  message: string;
}

const newsArticles: INewsEntry[] = [
  {
    title: 'Headline',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nulla orci, ultrices eget felis non, rhoncus tincidunt lorem.',
  },
  {
    title: 'Headline',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nulla orci, ultrices eget felis non, rhoncus tincidunt lorem.',
  },
  {
    title: 'Headline',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nulla orci, ultrices eget felis non, rhoncus tincidunt lorem.',
  },
  {
    title: 'Headline',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nulla orci, ultrices eget felis non, rhoncus tincidunt lorem.',
  },

  {
    title: 'Headline',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nulla orci, ultrices eget felis non, rhoncus tincidunt lorem.',
  },
];

function NewsArea() {
  return (
    <div>
      <Subtitle1>Latest News</Subtitle1>
      {newsArticles.map((article, i) => (
        <NewsArticle key={i} title={article.title} message={article.message} />
      ))}
    </div>
  );
}

export default NewsArea;
