import React from 'react';
import { Router, Route, Link } from 'react-router-dom';

import { history, Role } from '@/_helpers';
import { authenticationService } from '@/services';
import { PrivateRoute } from '@/components';
import { HomePage, ServiceDetailPage, CreateServicePage } from '@/pages/HomePage';
import { AdminPage, CreateTechnicienPage } from '@/pages/AdminPage';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function AuthAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
            <Typography variant="h6" className={classes.title}>
                After Sale Service
            </Typography>
            {/* <Button color="inherit"> */}
                <Link to="/login" className="btn btn-primary" color="inherit">Login</Link>
                <Link to="/signup" className="btn btn-primary" color="inherit">Register</Link>
                {/* </Button> */}
            {/* <Button color="inherit">Register</Button> */}
        </Toolbar>
      </AppBar>
    </div>
  );
}

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null,
            isAdmin: false
        };
    }

    componentDidMount() {
        authenticationService.currentUser.subscribe(x => this.setState({
            currentUser: x,
            isAdmin: x && x.roles[0] === Role.Admin
        }));
    }

    logout() {
        authenticationService.logout();
        history.push('/login');
    }

    render() {
        const { currentUser, isAdmin } = this.state;
        return (
            <Router history={history}>
                <div>
                    {currentUser &&
                        <nav className="navbar navbar-expand navbar-dark bg-dark">
                            <div className="navbar-nav">
                                <Link to="/" className="nav-item nav-link">Services</Link>
                                {isAdmin && <Link to="/admin" className="nav-item nav-link">User Management</Link>}
                                <a onClick={this.logout} className="nav-item nav-link">Logout</a>
                            </div>
                        </nav>
                    }
                    {!currentUser &&
                        <AuthAppBar />
                    }
                    <div className="jumbotron">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <PrivateRoute exact path="/" component={HomePage} />
                                    <PrivateRoute exact path="/admin" roles={[Role.Admin]} component={AdminPage} />
                                    <Route path="/login" component={LoginPage} />
                                    <Route path="/signup" component={RegisterPage} />
                                    <Route path="/service/:id" render={(props) => <ServiceDetailPage {...props} />} />
                                    <Route exact path="/admin/create/technicien" render={(props) => <CreateTechnicienPage {... props} />} />
                                    <Route exact path="/create/service" render={(props) => <CreateServicePage {... props} />} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

export { App }; 