import NewsModel from '../../api/models/NewsModel';

export default interface NewsListState {
  totalResults: number;
  articles: NewsModel[];
  originalArticles: NewsModel[];
  isFetching: boolean;
  error?: string;
}
