import NewsModel from '../../api/model/NewsModel';

export enum NewsActionTypes {
  GET_NEWS_LIST_START = 'GET_NEWS_LIST_START',
  GET_NEWS_LIST_SUCCESS = 'GET_NEWS_LIST_SUCCESS',
  GET_NEWS_LIST_FAILURE = 'GET_NEWS_LIST_FAILURE',
  SEARCH_NEWS_LIST_SUCCESS = 'SEARCH_NEWS_LIST_SUCCESS',
}

export interface GetNewsListStartAction {
  type: NewsActionTypes.GET_NEWS_LIST_START;
}

export interface GetNewsListSuccessAction {
  type: NewsActionTypes.GET_NEWS_LIST_SUCCESS;
  articles: NewsModel[];
  originalArticles: NewsModel[];
}

export interface SearchNewsListSuccessAction {
  type: NewsActionTypes.SEARCH_NEWS_LIST_SUCCESS;
  articles: NewsModel[];
}
export interface GetNewsListFailureAction {
  type: NewsActionTypes.GET_NEWS_LIST_FAILURE;
  error: string;
}

export type NewsListActions =
  | GetNewsListStartAction
  | GetNewsListSuccessAction
  | GetNewsListFailureAction
  | SearchNewsListSuccessAction;
