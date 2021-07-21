import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';

interface Props {
  progress?: number;
  message?: string;
}
const ProgressBar: React.FunctionComponent<Props> = (props: Props) => {
  const progressMessage = props.message ? props.message : 'Loading...';
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100%', lineHeight: '8em' }}
    >
      <h2 className="font-italic">{progressMessage}</h2>
      <CircularProgress />
    </Grid>
  );
};

export default ProgressBar;
