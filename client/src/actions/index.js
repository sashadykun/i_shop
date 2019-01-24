import types from './types';
import axios from 'axios';
import { authHeaders } from '../helpers';



export const jwtSignIn = () => async dispatch => {
    try{
        const {data: {user}} = await axios.get('/auth/jwt-sign-in', authHeaders());

        dispatch({
            type: types.SIGN_IN,
            user
        });
    }catch(err){
        console.log('JWT Sign In Error:', err);
    }
}

export const signIn = userInfo => async dispatch => {
    try {
        const {data: {token, user} } = await axios.post('/auth/sign-in', userInfo);

        
        

        localStorage.setItem('token', token);

        dispatch({
            type: types.SIGN_IN,
            user
        });

    }catch(err){
        console.log('Sign up Error:', err.message);
    }
}

export const signUp = userInfo => async dispatch => {
    try {
        const {data: { token, user } } = await axios.post('/auth/sign-up', userInfo);
        


        localStorage.setItem('token', token);

        dispatch({
            type: types.SIGN_UP,
            user
        });

    }catch(err){
        console.log('Sign up Error:', err.message);
    }
}

export const signOut = () => {
    localStorage.removeItem('token');

    return { type: types.SIGN_OUT}
}