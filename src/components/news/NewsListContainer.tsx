import React, { FunctionComponent } from 'react';
import { Grid } from '@material-ui/core';
import NewsListState from '../../redux/state/NewsListState';
import ProgressBar from '../ProgressBar';
import NewsList from './NewsList/NewsList';

import { Container } from '@material-ui/core';
import { searchNews } from '../../redux/actions/NewsListActionCreators';
import { connect } from 'react-redux';
import NewsSearch from './NewsSearch/NewsSearch';
import EnhancedTableToolbar from './EnhancedToolBar/EnhancedToolbar';

interface Props {
  newsList: NewsListState;
  searchNews: (term: string) => void;
}

const NewsListContainer: FunctionComponent<Props> = (props: Props) => {
  const { newsList, searchNews } = props;
  return (
    <>
      <Container style={{ marginTop: '3em' }} maxWidth="lg">
        <EnhancedTableToolbar>
          <NewsSearch onSearchNews={searchNews} />
        </EnhancedTableToolbar>
      </Container>
      <br />
      {newsList.isFetching ? (
        <ProgressBar />
      ) : !newsList.articles.length ? (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: '100%', lineHeight: '8em' }}
        >
          <h2 className="font-italic">
            No articles found.{' '}
            <span role="img" aria-label="doh!">
              😓
            </span>
          </h2>
        </Grid>
      ) : (
        <NewsList news={newsList.articles} />
      )}
    </>
  );
};

const mapDispatchToProps = (dispatch: Function) => ({
  searchNews: (term: string) => dispatch(searchNews(term)),
});
export default connect(null, mapDispatchToProps)(NewsListContainer);
