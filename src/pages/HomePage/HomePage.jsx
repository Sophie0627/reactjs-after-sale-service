import * as React from 'react';
import { Link } from 'react-router-dom';
import { serviceService, authenticationService } from '@/services';
import { Role } from '@/_helpers';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const columns = [
  { id: 'title', label: 'Title', minWidth: 270 },
  { id: 'client', label: 'Client Name', minWidth: 100 },
  { id: 'technicien', label: 'Technicien Name', minWidth: 100 },
  {
    id: 'status',
    label: 'Status',
    minWidth: 170,
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'createdAt',
    label: 'Created Date',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
];

function createData(title, client, technicien, status, createdAt, id ) {
  return { title, client, status, technicien, createdAt, id };
}

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  React.useEffect(() => {
    serviceService.getAllServices(authenticationService.currentUserValue.accessToken).then(serviceFromApi => {
        var arr = [];
        serviceFromApi.forEach(service => {
          console.log("[service] ", service);
            arr.push(createData(service.title, service.client, service.technicien, service.status, service.createdAt, service.serviceId));
        });
        setRows(arr);
        setLoading(false);
    });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    loading
    ? <div>Loading service data...</div> 
    : <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                        column.id == "title"
                        ? <TableCell key={column.id} align={column.align}>
                            <Link to={"/service/" + row.id}>{value}</Link>
                        </TableCell> 
                        : <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number' ? column.format(value) : value}
                        </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            isAdmin: false,
            isClient: false,
            isTechnicien: false
        };
    }

    componentDidMount() {
      authenticationService.currentUser.subscribe(x => this.setState({
          currentUser: x,
          isAdmin: x && x.roles[0] === Role.Admin,
          isClient: x && x.roles[0] === Role.Client,
          isTechnicien: x && x.roles[0] === Role.Tech,
      }));
    }

    render() {
        const { currentUser } = this.state;
        return (
            <div>
                <h1>Service List</h1>
                <p>You're logged in with React & JWT!!</p>
                <p>Your role is: <strong>{currentUser.roles[0]}</strong>.</p>
                {this.state.isClient && 
                  <Link to="/create/service" className="btn btn-primary" color="inherit">Request After-sales Service</Link>
                }
                <StickyHeadTable />
            </div>
        );
    }
}

export { HomePage };