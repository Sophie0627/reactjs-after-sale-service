import React from 'react';
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
    
];

class AdminPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: null
        };
    }

    componentDidMount() {
        userService.getAll().then(users => this.setState({ users }));
    }

    render() {
        const { users } = this.state;
        return (
            <div>
                <h1>User management</h1>
                <p>This page can only be accessed by administrators.</p>
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
            </div>
        );
    }
}

export { AdminPage };