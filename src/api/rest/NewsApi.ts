import axios, { AxiosResponse } from 'axios';
import config from '../../config';
import NewsListResponse from '../model/NewsListModel';

export class NewsApi {
  private baseUrl = `https://newsapi.org/v2/everything?pageSize=100&domains=wsj.com&apiKey=${config.API_KEY}`;
  private newsUrl = `${this.baseUrl}`;

  getNews(): Promise<AxiosResponse<NewsListResponse>> {
    return axios.get<NewsListResponse>(`${this.newsUrl}`);
  }

  // searchNews(term: string): Promise<AxiosResponse<NewsListResponse>> {
  //   return axios.get<NewsListResponse>(`${this.newsUrl}?q=${term}`);
  // }
}
