import React, { FunctionComponent } from 'react';
import dayjs from 'dayjs';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  Paper,
  TableSortLabel,
  TableRow,
  TablePagination,
  TableHead,
  TableContainer,
  Container,
  Card,
  CardActionArea,
  Button,
} from '@material-ui/core';

import NewsModel from '../../api/models/NewsModel';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;

  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof NewsModel;
  label: string;
  align: 'left' | 'right' | 'center';
}

const headCells: HeadCell[] = [
  {
    id: 'image',
    align: 'left',
    disablePadding: true,
    label: 'Image',
  },
  { id: 'source', align: 'left', disablePadding: false, label: 'Source' },
  { id: 'author', align: 'left', disablePadding: false, label: 'Author' },
  { id: 'title', align: 'left', disablePadding: false, label: 'Title' },
  { id: 'date', align: 'left', disablePadding: false, label: 'Date' },
  { id: 'url', align: 'right', disablePadding: false, label: 'URL' },
];

interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof NewsModel
  ) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof NewsModel) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            className={classes.tableHead}
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.id === 'date' ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
                className={classes.tableHead}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useStyles = makeStyles((theme: Theme) =>
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

interface Props {
  news: NewsModel[];
}

const NewsList: FunctionComponent<Props> = (props: Props) => {
  const classes = useStyles();
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof NewsModel>('date');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (_: any, property: keyof NewsModel) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const { news } = props;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, news.length - page * rowsPerPage);

  return (
    <Container maxWidth="lg">
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <TableContainer style={{ overflowY: 'auto', maxHeight: '500px' }}>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size={'medium'}
              stickyHeader
              aria-label="sticky table"
            >
              <EnhancedTableHead
                classes={classes}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={news.length}
              />
              <TableBody>
                {stableSort(news as NewsModel[], getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        key={row.url}
                        hover
                        role="checkbox"
                        tabIndex={-1}
                      >
                        <TableCell
                          width="20%"
                          component="th"
                          scope="row"
                          padding="none"
                          align="center"
                        >
                          <Card className={classes.imageWidth}>
                            <CardActionArea>
                              <img
                                style={{
                                  height: 140,
                                  maxWidth: 345,
                                  paddingTop: '1em',
                                  paddingBottom: '1em',
                                }}
                                alt={row.title}
                                src={row.image}
                              />
                            </CardActionArea>
                          </Card>
                        </TableCell>
                        <TableCell width="10%" align="left">
                          {row.source}
                        </TableCell>
                        <TableCell
                          style={{
                            whiteSpace: 'normal',
                            wordBreak: 'break-word',
                          }}
                          width="15%"
                          align="left"
                        >
                          {row.author}
                        </TableCell>
                        <TableCell width="35%" align="left">
                          {row.title}
                        </TableCell>
                        <TableCell width="10%" align="left">
                          {dayjs(row.date).format('DD MMM YYYY')} @
                          {dayjs(row.date).format('hh:mm a')}
                        </TableCell>
                        <TableCell width="10%" align="right">
                          <a target="_blank" rel="noreferrer" href={row.url}>
                            <Button variant="contained" color="primary">
                              Link
                            </Button>
                          </a>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 55 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <br /> <br />
          <TablePagination
            rowsPerPageOptions={[10]}
            component="div"
            labelRowsPerPage="Per Page"
            count={news.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            style={{ display: 'flex' }}
          />
        </Paper>
      </div>
    </Container>
  );
};

export default NewsList;
