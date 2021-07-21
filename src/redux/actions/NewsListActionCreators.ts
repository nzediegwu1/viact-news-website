import { Dispatch } from 'redux';
import { NewsApi } from '../../api/rest/NewsApi';
import {
  GetNewsListStartAction,
  GetNewsListSuccessAction,
  GetNewsListFailureAction,
  NewsActionTypes,
} from './NewsActions';
import NewsModel from '../../api/model/NewsModel';

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
  };
};

export const getNewsFailure = (error: string): GetNewsListFailureAction => {
  return {
    type: NewsActionTypes.GET_NEWS_LIST_FAILURE,
    error: error,
  };
};

export const getNews = () => {
  return async (dispatch: Dispatch) => {
    dispatch(getNewsStart());
    return new NewsApi()
      .getNews()
      .then((response) => dispatch(getNewsSuccess(response.data.articles)))
      .catch((error) =>
        dispatch(getNewsFailure('Could not get News: ' + error.message))
      );
  };
};

export const searchNews = (term: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(getNewsStart());
    return new NewsApi()
      .searchNews(term)
      .then((response) => dispatch(getNewsSuccess(response.data.articles)))
      .catch((error) =>
        dispatch(getNewsFailure('Could not search for news: ' + error.message))
      );
  };
};
