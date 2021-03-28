import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { userService, authenticationService } from '@/services';

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
    { id: 'username', label: 'Username', minWidth: 270 },
    { id: 'email', label: 'Email', minWidth: 200 },
    { id: 'role', label: 'Role', minwidth: 200 }
];

function createData(username, email, role, id) {
    return { username, email, role, id };
}

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    }
});

export default function StickyHeadTable() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rows, setRows] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    React.useEffect(() => {
        userService.getAllUsers(authenticationService.currentUserValue.accessToken).
        then(users => {
            var arr = [];
            users.forEach(user => {
                arr.push(createData(user.username, user.email, user.roles[0].name, user._id));
            });
            setRows(arr);
            setLoading(false);
        })
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
        ? <div>Loading user data...</div> 
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
class AdminPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: null
        };
    }

    // componentDidMount() {
    //     userService.getAll().then(users => this.setState({ users }));
    // }

    render() {
        const { users } = this.state;
        return (
            <div>
                <h1>User management</h1>
                <p>This page can only be accessed by administrators.</p>
                <Link to="/admin/create/technicien" className="btn btn-primary" color="inherit">Create a Technicien</Link>
                <div>
                    All users from secure (admin only) api end point:
                    {users &&
                        <ul>
                            {users.map(user =>
                                <li key={user.id}>{user.username}</li>
                            )}
                        </ul>
                    }
                </div>
                <StickyHeadTable/>
            </div>
        );
    }
}

export { AdminPage };