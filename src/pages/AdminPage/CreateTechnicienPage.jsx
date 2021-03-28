import * as React from 'React';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { userService, authenticationService } from '@/services'; 

const useStyles = makeStyles({
    root: {
      minWidth: "50%",
    }
});

function CreateTechnicienPage(props) {

    const classes = useStyles();

    return (
        <div>
            <h1>Create a Technicien</h1>
            <Card className="classes.root">
                <CardContent>
                    <Formik
                        initialValues={{
                            userName: '',
                            email: '',
                            password: ''
                        }}
                        validationSchema={Yup.object().shape({
                            userName: Yup.string().required('Username is required'),
                            email: Yup.string().required('Email is required'),
                            password: Yup.string().required('Password is required')
                        })}
                        onSubmit={({ userName, email, password }, { setStatus, setSubmitting }) => {
                            console.log("[email] ", email);
                            setStatus();
                            userService.createTechnicien(userName, email, password, authenticationService.currentUser.accessToken)
                                .then(
                                    user => {
                                        // const { from } = this.props.location.state || { from: { pathname: "/" } };
                                        // this.props.history.push(from);
                                        props.history.push("/admin");
                                    },
                                    error => {
                                        setSubmitting(false);
                                        setStatus(error);
                                    }
                                );
                        }}
                        render={({ errors, status, touched, isSubmitting }) => (
                            <Form>
                                <div className="form-group">
                                    <label htmlFor="userName">UserName</label>
                                    <Field name="userName" type="text" className={'form-control' + (errors.userName && touched.userName ? ' is-invalid' : '')} />
                                    <ErrorMessage name="userName" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                    <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                    <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Create a Technicien</button>
                                    {isSubmitting &&
                                        <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                    }
                                </div>
                                {status &&
                                    <div className={'alert alert-danger'}>{status}</div>
                                }
                            </Form>
                        )}
                    />
                </CardContent>
            </Card>
        </div>
    ); 
}

export { CreateTechnicienPage }