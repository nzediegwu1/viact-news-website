import axios, { AxiosResponse } from 'axios';
import config from '../../config';
import NewsListResponse from '../models/NewsListModel';

export class NewsApi {
  private baseUrl = 'https://newsapi.org/v2/everything';
  private newsUrl = `${this.baseUrl}?pageSize=100&domains=wsj.com&apiKey=${config.API_KEY}`;

  getNews(): Promise<AxiosResponse<NewsListResponse>> {
    return axios.get<NewsListResponse>(`${this.newsUrl}`);
  }
  /**
   * @description Enables searching newsapi with user query (Not used)
   * @param {String} term User search string
   * @returns {Promise} Promise to return search result list from newsapi
   */
  searchNews(term: string): Promise<AxiosResponse<NewsListResponse>> {
    return axios.get<NewsListResponse>(
      `${this.baseUrl}?&domains=wsj.com&apiKey=${config.API_KEY}&q=${term}`
    );
  }
}
