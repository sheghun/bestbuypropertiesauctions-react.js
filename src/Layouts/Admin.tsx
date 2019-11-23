// @flow
import * as React from 'react';
import {Route} from 'react-router';
import loadable from '@loadable/component';
import LoadingPage from '../Components/LoadingPage';

const Login = loadable(() => import('../Views/Login'), {fallback: <LoadingPage />});

type Props = {};
const Admin = (props: Props) => {
    return (
        <>
            <Route path={'/admin/tl/login'} component={Login} />
        </>
    );
};

export default Admin;
