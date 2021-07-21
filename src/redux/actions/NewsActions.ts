import NewsModel from '../../api/model/NewsModel';

export enum NewsActionTypes {
  GET_NEWS_LIST_START = 'GET_NEWS_LIST_START',
  GET_NEWS_LIST_SUCCESS = 'GET_NEWS_LIST_SUCCESS',
  GET_NEWS_LIST_FAILURE = 'GET_NEWS_LIST_FAILURE',
}

export interface GetNewsListStartAction {
  type: NewsActionTypes.GET_NEWS_LIST_START;
}

export interface GetNewsListSuccessAction {
  type: NewsActionTypes.GET_NEWS_LIST_SUCCESS;
  articles: NewsModel[];
}

export interface GetNewsListFailureAction {
  type: NewsActionTypes.GET_NEWS_LIST_FAILURE;
  error: string;
}

export type NewsListActions =
  | GetNewsListStartAction
  | GetNewsListSuccessAction
  | GetNewsListFailureAction;
