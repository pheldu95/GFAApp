import { FORM_ERROR } from 'final-form'
import React, { useContext } from 'react'
import {Form as FinalForm, Field} from 'react-final-form'
import { combineValidators, isRequired } from 'revalidate'
import { Button, Form, Header } from 'semantic-ui-react'
import ErrorMessage from '../../app/common/form/ErrorMessage'
import TextInput from '../../app/common/form/TextInput'
import { IUserFormValues } from '../../app/models/user'
import { RootStoreContext } from '../../app/stores/rootStore'

const validate = combineValidators({
    email: isRequired('email'),
    password: isRequired('password')
})

const LoginForm = () => {
    //get access to our userStore
    const rootStore = useContext(RootStoreContext);
    const { login } = rootStore.userStore;
    return (
        <FinalForm
            onSubmit={(values: IUserFormValues)=> login(values).catch(error => ({
                //set the form to have submiterror as true
                //FORM_ERROR is from react final form
                //then we can use it to display an error on our form
                [FORM_ERROR]: error
            }))}
            // make our validation rules available
            validate={validate}
            render={({
                handleSubmit, 
                submitting, 
                form, 
                submitError, 
                //if the info entered is invalid, then the login button will not be clickable
                invalid, 
                pristine,
                dirtySinceLastSubmit
            })=>(
                <Form onSubmit={handleSubmit} error>
                    <Header as='h2' content='Login' color='olive' textAlign='center'/>
                    <Field
                        name='email'
                        component={TextInput}
                        placeholder='Email'
                    />
                    <Field
                        name='password'
                        component={TextInput}
                        placeholder='Password'
                        // giving it type of password hides the characters as the user is typing
                        type='password'
                    />
                    {/* if there is a submitError, from react-final-form, we will display an errror label */}
                    {submitError && !dirtySinceLastSubmit && 
                        <ErrorMessage error={submitError} text='Invalid email or password'/>
                    }
                    <Button disabled={invalid && dirtySinceLastSubmit || pristine} loading={submitting} positive content='Login' fluid/>
                </Form>
            )}
        />
            
    )
}

export default LoginForm