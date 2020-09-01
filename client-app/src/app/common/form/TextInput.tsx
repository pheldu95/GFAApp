import React from 'react'
import { FieldRenderProps } from 'react-final-form'
import { FormFieldProps, Form, Label } from 'semantic-ui-react'

//THIS component is our text input, we can use it anywhere in our app that needs a text input

//typing
//because it's a text input, it will be getting a string, and an HTML Input Element
//we will also be using FormFieldProps from Semantic UI
interface IProps extends FieldRenderProps<string, HTMLElement>, FormFieldProps{}

//width is available from formfieldprops
//meta comes from react-final-form
const TextInput: React.FC<IProps> = ({
    input, 
    width, 
    type, 
    placeholder, 
    meta: {touched, error}
}) => {
    //mark the form field as errored if it has been touched and there's been an error
    return (
        <Form.Field error={touched && !!error} type={type} width={width}>
            {/* use the spread operator to give the input all of the available properties from input
            will give us an onChange handler, onBlur handler, value etc*/}
            <input {...input} placeholder={placeholder}/>
            {/* if the input has been touched, and we have an eror, then we will label the input as such */}
            {touched && error && (
                <Label basic color='red'>{error}</Label>
            )}
        </Form.Field>
    );
}

export default TextInput