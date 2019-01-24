import React from 'react';
import SignIn from './sign_in';
import SignUp from './sign_up';
import {Route, Switch} from 'react-router-dom';
import auth from '../../hoc/auth';
import NotFound from '../general/404';
export default ({match: {path}}) => {
   

    return (
        <Switch>
            <Route path={`${path}/sign-in`} component={auth(SignIn, '/profile', false)}/>
            <Route path={`${path}/sign-up`} component={auth(SignUp, '/profile', false)}/>
            <Route component={NotFound}/>
        </Switch>
    )
}


