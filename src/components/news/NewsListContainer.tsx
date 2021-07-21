import React, { FunctionComponent } from 'react';
import { Grid } from '@material-ui/core';
import NewsListState from '../../redux/state/NewsListState';
import ProgressBar from '../ProgressBar';
import NewsList from './NewsList';

import clsx from 'clsx';
import {
  createStyles,
  lighten,
  makeStyles,
  Theme,
} from '@material-ui/core/styles';
import { Typography, Toolbar, Container } from '@material-ui/core';
import { searchNews } from '../../redux/actions/NewsListActionCreators';
import { connect } from 'react-redux';
import NewsSearch from './NewsSearch';

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: '1 1 100%',
    },
  })
);

const EnhancedTableToolbar = ({ children }: any) => {
  const classes = useToolbarStyles();

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: false,
      })}
    >
      <Typography
        className={classes.title}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        <div style={{ display: 'flex' }}>{children} &nbsp;</div>
      </Typography>
    </Toolbar>
  );
};

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

const mapDispatchToProps = (dispatch: Function) => {
  return {
    searchNews: (term: string) => dispatch(searchNews(term)),
  };
};

export default connect(null, mapDispatchToProps)(NewsListContainer);
