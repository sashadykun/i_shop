import React from 'react';

import { Field, reduxForm} from 'redux-form';
import  Input from '../../general/form/input';
import {validation} from '../../../helpers/';



let SignUpForm = props => {
    const { handleSubmit, onSubmit } = props;
    return(
        
            
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
                <Field name="firstName" size="s6" label="First Name" component={Input}/>
                <Field name="lastName" size="s6" label="Last Name" component={Input}/>
            </div>
            <div className="row">
                <Field name="email" size="s6 offset-s3" label="Email" component={Input}/>
                
            </div>
            <div className="row">
                <Field name="password" size="s6" label="Password" type="password" component={Input}/>
                <Field name="confirmPassword" size="s6" label="Confirm Password" type="password" component={Input}/>
            </div>
            <div className="row">
                <div className="col s6 center">
                    <button typoe="button" className="btn black white-text">Cancel</button>
                </div>
                <div className="col s6 center">
                    <button typoe="button" className="btn grey darken-1">Sign Up</button>
                </div>
            </div>
        </form>
    
    )
       
     
}

function validate({firstName, lastName, email, password, comfirmPassword}){
    const error = {};

    if(!firstName){
        error.firstName = 'Please enter your first name'
    }
    if(!lastName){
        error.lastName = 'Please enter your last name'
    }
    if(!email){
        error.email = 'Please enter your email'
    }else if(!validation.email(email)) {
        error.email = 'Please enter valid email'
    }
    if(!password){
        error.password = 'Please create a password'
    }else if(!validation.password(password)){
        error.password = 'Password mast contein upper lower a special car a num and 8 + car '
    }
    if(password !== comfirmPassword){
        error.comfirmPassword = 'Passwords do not match'
    }
    return error;
}

SignUpForm = reduxForm({
    form: 'sign-up',
    validate,
    initialValues: {
        firstName: 'Sasha',
        lastName: 'Dykun',
        email: 'sasha@ya.com',
        password: 'daDA1234!',
        confirmPassword: 'daDA1234!'
    }
})(SignUpForm)


export default SignUpForm;
