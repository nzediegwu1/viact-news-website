import { Dispatch } from 'redux';
import { NewsApi } from '../../api/rest/NewsApi';
import {
  GetNewsListStartAction,
  GetNewsListSuccessAction,
  NewsActionTypes,
  SearchNewsListSuccessAction,
} from './NewsActions';
import NewsModel from '../../api/models/NewsModel';

export const getNewsStart = (): GetNewsListStartAction => {
  return {
    type: NewsActionTypes.GET_NEWS_LIST_START,
  };
};

export const getNewsSuccess = (
  results: NewsModel[]
): GetNewsListSuccessAction => {
  return {
    type: NewsActionTypes.GET_NEWS_LIST_SUCCESS,
    articles: results,
    originalArticles: results,
  };
};

export const searchNewsSuccess = (
  results: NewsModel[]
): SearchNewsListSuccessAction => {
  return {
    type: NewsActionTypes.SEARCH_NEWS_LIST_SUCCESS,
    articles: results,
  };
};

export const getNews = () => {
  return async (dispatch: Dispatch) => {
    dispatch(getNewsStart());
    return new NewsApi()
      .getNews()
      .then((response) =>
        dispatch(
          getNewsSuccess(
            response.data.articles.map((item) => ({
              image: item.urlToImage,
              source: item.source.name,
              author: item.author,
              title: item.title,
              date: item.publishedAt,
              url: item.url,
            }))
          )
        )
      )
      .catch(() => dispatch(getNewsSuccess([])));
  };
};

export const searchNews = (term: string) => {
  return async (dispatch: Dispatch, getState: Function) => {
    dispatch(getNewsStart());
    const state = getState();
    const { originalArticles: articles } = state.newsListState;

    const filter = articles.filter(
      (item: NewsModel) =>
        item.title.toLowerCase().includes(term.toLowerCase()) ||
        item.source.toLowerCase().includes(term.toLowerCase())
    );
    return dispatch(searchNewsSuccess(filter));
  };
};
