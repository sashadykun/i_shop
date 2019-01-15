import types from './types';
import axios from 'axios';
import { authHeaders } from '../helpers';



export const jwtSignIn = () => async dispatch => {
    try{
        const resp = await axios.get('/auth/jwt-sign-in', authHeaders());

        console.log('JWT sign in resp:', resp);
    }catch(err){
        console.log('JWT Sign In Error:', err);
    }
}

export const signIn = userInfo => async dispatch => {
    try {
        const resp = await axios.post('/auth/sign-in', userInfo);

        console.log('Sign in resp', resp);

        localStorage.setItem('token', resp.data.token)

    }catch(err){
        console.log('Sign up Error:', err.message);
    }
}

export const signUp = userInfo => async dispatch => {
    try {
        const resp = await axios.post('/auth/sign-up', userInfo);
        console.log('sign up sesp:', resp);
    }catch(err){
        console.log('Sign up Error:', err.message);
    }
}