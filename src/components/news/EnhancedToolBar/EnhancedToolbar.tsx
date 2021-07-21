import clsx from 'clsx';
import { Typography, Toolbar } from '@material-ui/core';

import useToolbarStyles from './EnhancedToolbar.style';

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

export default EnhancedTableToolbar;
