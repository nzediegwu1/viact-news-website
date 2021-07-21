import React, { FunctionComponent } from 'react';
import { Grid } from '@material-ui/core';
import NewsListState from '../../redux/state/NewsListState';
import ProgressBar from '../ProgressBar';
import Alert, { AlertType } from '../Alert';
import NewsList from './NewsList';

interface Props {
  newsList: NewsListState;
}
const NewsListContainer: FunctionComponent<Props> = (props: Props) => {
  const { newsList } = props;

  if (newsList.isFetching) {
    return <ProgressBar />;
  } else {
    if (newsList.error) {
      return <Alert type={AlertType.DANGER} message={newsList.error} />;
    } else {
      return !newsList.articles.length ? (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: '100vh' }}
        >
          <h2 className="font-italic">No articles found.</h2>
          <span role="img" aria-label="doh!">
            😓
          </span>
        </Grid>
      ) : (
        <NewsList news={newsList.articles} />
      );
    }
  }
};
export default NewsListContainer;
