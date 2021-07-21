import React from 'react';
import { connect } from 'react-redux';
import AppState from '../redux/state/AppState';
import { getNews, searchNews } from '../redux/actions/NewsListActionCreators';
import NewsSearch from './news/NewsSearch/NewsSearch';
import NavigationBar from './NavigationBar';
import NewsListState from '../redux/state/NewsListState';
import NewsListContainer from './news/NewsListContainer';

interface Props {
  getNews(): void;
  searchNews(term: string): void;
  newsList: NewsListState;
}

export class App extends React.Component<Props> {
  componentDidMount = () => {
    if (!this.props.newsList.articles.length) this.props.getNews();
  };

  public render() {
    const { searchNews, newsList } = this.props;
    return (
      <div className="app-container">
        <NavigationBar>
          <NewsSearch onSearchNews={searchNews} />
        </NavigationBar>

        <NewsListContainer newsList={newsList} />
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    newsList: state.newsListState,
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    getNews: () => dispatch(getNews()),
    searchNews: (term: string) => dispatch(searchNews(term)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
