// @flow
import * as React from 'react';
import {Route, RouteComponentProps} from 'react-router';
import loadable from '@loadable/component';
import LoadingPage from '../Components/LoadingPage';

const Login = loadable(() => import('../Views/Admin/Login'), {fallback: <LoadingPage />});
const Overview = loadable(() => import('../Views/Admin/Overview'), {fallback: <LoadingPage />});

const Admin = ({match}: RouteComponentProps) => {
    return (
        <>
            {match.url === '/admin/tl/login' ? (
                <Route component={Login} />
            ) : (
                <Route path={'/admin/tl/overview'} component={Overview} />
            )}
        </>
    );
};

export default Admin;
