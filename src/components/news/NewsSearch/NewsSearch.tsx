import React from 'react';
import { debounce } from 'lodash';

import { InputBase } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import useSearchStyle from './NewsSearch.style';

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

  onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: event.target.value }, this.debouncedSearchNews);
  };

  debouncedSearchNews = debounce(() => {
    this.props.onSearchNews(this.state.value);
  }, 300);

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

export default withStyles(useSearchStyle)(NewsSearch);
