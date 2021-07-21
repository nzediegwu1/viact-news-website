import React from 'react';
import { debounce } from 'lodash';

import { InputBase } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import {
  alpha,
  Theme,
  withStyles,
  createStyles,
} from '@material-ui/core/styles';

const styles = (theme: Theme) =>
  createStyles({
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '15em',
        '&:focus': {
          width: '20em',
        },
      },
    },
  });

interface Props {
  onSearchNews(term: string): void;
  classes: any;
}

interface State {
  value: string;
}

class NewsSearch extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { value: '' };
  }

  onChangeHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    await this.setState({ value: event.target.value }, () =>
      this.debouncedSearchNews()
    );
    console.log(this.state.value);
  };

  debouncedSearchNews = debounce(() => {
    this.props.onSearchNews(this.state.value);
  }, 0);

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          style={{ backgroundColor: 'rgb(0 101 245 / 27%)' }}
          inputProps={{ 'aria-label': 'search' }}
          value={this.state.value}
          onChange={this.onChangeHandler}
        />
      </div>
    );
  }
}

export default withStyles(styles)(NewsSearch);
