import React, { FunctionComponent } from 'react';
import dayjs from 'dayjs';
import {
  Table,
  TableBody,
  TableCell,
  Paper,
  TableRow,
  TablePagination,
  TableContainer,
  Container,
  Card,
  CardActionArea,
  Button,
} from '@material-ui/core';

import NewsModel from '../../../api/models/NewsModel';
import useNewsListStyles from './NewsList.style';
import { Order } from '../../../types';
import { getComparator, stableSort } from '../../../utils';
import EnhancedTableHead from '../NewsHeader/NewsHeader';

interface Props {
  news: NewsModel[];
}

const NewsList: FunctionComponent<Props> = (props: Props) => {
  const classes = useNewsListStyles();
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof NewsModel>('date');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (_: any, property: keyof NewsModel) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
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
