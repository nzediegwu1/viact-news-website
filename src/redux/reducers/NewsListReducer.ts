import { Reducer } from 'redux';
import NewsListState from '../state/NewsListState';
import { NewsActionTypes, NewsListActions } from '../actions/NewsActions';

const initialState: NewsListState = {
  articles: [],
  isFetching: false,
  totalResults: 0,
  originalArticles: [],
};
const NewsListReducer: Reducer<NewsListState, NewsListActions> = (
  state = initialState,
  action: NewsListActions
) => {
  switch (action.type) {
    case NewsActionTypes.GET_NEWS_LIST_START: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case NewsActionTypes.GET_NEWS_LIST_SUCCESS: {
      return {
        ...state,
        articles: action.articles,
        originalArticles: action.articles,
        isFetching: false,
      };
    }
    case NewsActionTypes.GET_NEWS_LIST_FAILURE: {
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    }
    case NewsActionTypes.SEARCH_NEWS_LIST_SUCCESS: {
      return {
        ...state,
        articles: action.articles,
        isFetching: false,
      };
    }
    default:
      return state;
  }
};

export default NewsListReducer;
