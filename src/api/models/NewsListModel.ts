import NewsModel from './NewsModel';

interface NewsResponseModel {
  source: {
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
}
export default interface NewsListResponse {
  status: string;
  totalResults: number;
  articles: NewsResponseModel[];
}
