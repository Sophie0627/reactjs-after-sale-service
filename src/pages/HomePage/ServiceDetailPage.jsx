import * as React from 'react';
import { serviceService, authenticationService } from '@/services';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

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

function ServiceDetailPage(props) {

    const classes = useStyles();
    const { id } = props.match.params;
    const [detail, setDetail] = React.useState();
    const [loading, setLoading] = React.useState(true);
    
    React.useEffect(() => {
        serviceService.getOneService(id, authenticationService.currentUserValue.accessToken).then(data => {
            setDetail(data);
            setLoading(false);
        });
    }, []);

    console.log(detail);

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
                </div>
            }
        </div>
    );
}

export {ServiceDetailPage};