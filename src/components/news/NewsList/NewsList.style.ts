import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useNewsListStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      boxShadow: '0px 0px 7px 0px dodgerblue',
    },
    imageWidth: {
      maxWidth: 345,
    },
    imageHeight: {
      height: 140,
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
      paddingLeft: '1.5em',
      paddingTop: '1.5em',
    },
    table: {
      minWidth: 750,
    },
    tableHead: {
      backgroundColor: '#3f51b5',
      color: 'white',
      paddingLeft: '1em',
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  })
);

export default useNewsListStyles;
