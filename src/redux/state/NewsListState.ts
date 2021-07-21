import NewsModel from '../../api/model/NewsModel';

export default interface NewsListState {
  totalResults: number;
  articles: NewsModel[];
  isFetching: boolean;
  error?: string;
}
