import * as React from 'react';
import { serviceService, authenticationService } from '@/services';
import { Role } from '@/_helpers';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    title: {
        textAlign: 'left',
        padding: theme.spacing(5),
    }
}));

function acceptService(serviceId, props) {
    serviceService.updateService(serviceId, authenticationService.currentUserValue.id, authenticationService.currentUserValue.accessToken)
    .then(service => {
        props.history.push("/");
    })
}

function ServiceDetailPage(props) {

    const classes = useStyles();
    const { id } = props.match.params;
    const [detail, setDetail] = React.useState();
    const [loading, setLoading] = React.useState(true);
    const [isAdmin, setAdmin] = React.useState(false);
    const [isClient, setClient] = React.useState(false);
    const [isTech, setTech] = React.useState(false);
    const [isAccepted, setAccept] = React.useState(false);
    
    React.useEffect(() => {
        serviceService.getOneService(id, authenticationService.currentUserValue.accessToken).then(data => {
            console.log(data);
            setDetail(data);
            setAccept(data.status && data.status.name === "accepted");
            setLoading(false);
        });
        authenticationService.currentUser.subscribe(x => {
            console.log(x);
            console.log(x && x.roles[0] === Role.Technicien);
            setAdmin(x && x.roles[0] === Role.Admin);
            setClient(x && x.roles[0] === Role.Client);
            setTech(x && x.roles[0] === Role.Technicien);
        });
    }, []);

    return (
        <div>
            {!loading &&
                <div>
                    <h1>{detail.title.toUpperCase()}</h1>
                    <Paper className={classes.paper} justify="flex-start">
                        <Grid container spacing={3}>
                            <Grid item xs={12} className={classes.title}>
                                {detail.description}
                            </Grid>
                            <Grid item xs={4}>Client Name:</Grid>
                            <Grid item xs={8}>{detail.client.username}</Grid>
                            <Grid item xs={4}>Status:</Grid>
                            <Grid item xs={8}>{detail.status.name}</Grid>
                            <Grid item xs={4}>Created Date:</Grid>
                            <Grid item xs={8}>{detail.createdAt}</Grid>
                            <Grid item xs={4}>Updated Date:</Grid>
                            <Grid item xs={8}>{detail.updatedAt}</Grid>
                        </Grid>
                    </Paper>
                    {(isTech && !isAccepted) &&
                        <Button variant="contained" color="primary" onClick={() => acceptService(id, props)}>Accept This Service</Button>
                    }
                </div>
            }
        </div>
    );
}

export {ServiceDetailPage};