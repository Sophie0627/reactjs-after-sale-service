import * as React from 'react';
import { serviceService, authenticationService } from '@/services';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'title', headerName: 'Title', width: 130 },
  { field: 'client', headerName: 'Client name', width: 130 },
  { field: 'status', headerName: 'Status', width: 130 },
  { field: 'createdAt', headerName: 'Created Date', width: 150 },
  
];

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            serviceFromApi: null,
            isLoading: true,
        };
    }

    componentDidMount() {
        const { currentUser } = this.state;
        console.log(currentUser);
        serviceService.getAllServices(currentUser.accessToken).then(serviceFromApi => {
            this.setState({
                serviceFromApi: serviceFromApi,
                isLoading: false,
            });
        });
    }

    render() {
        const { currentUser, serviceFromApi } = this.state;
        console.log(serviceFromApi)
        return (
            <div>
                <h1>Service List</h1>
                <p>You're logged in with React & JWT!!</p>
                <p>Your role is: <strong>{currentUser.roles[0]}</strong>.</p>
                <p>This page can be accessed by all authenticated users.</p>
                <div>
                    Current user from secure api end point:
                    {/* {userFromApi &&
                        <ul>
                            <li>{userFromApi.firstName} {userFromApi.lastName}</li>
                        </ul>
                    } */}
                </div>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid rows={this.state.isLoading ? [] : serviceFromApi} columns={columns} pageSize={5} checkboxSelection />
                </div>
            </div>
        );
    }
}

export { HomePage };