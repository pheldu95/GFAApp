import React from "react";
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps, Form, Label } from "semantic-ui-react";

//THIS component is our text area input, we can use it anywhere in our app that needs a text area input

//typing
//because it's a text input, it will be getting a string, and an HTML Input Element
//we will also be using FormFieldProps from Semantic UI
interface IProps
  extends FieldRenderProps<string, HTMLElement>,
    FormFieldProps {}

const TextAreaInput: React.FC<IProps> = ({
    input,
    width,
    rows,
    placeholder,
    meta: { touched, error },
}) => {
  return (
    <Form.Field error={touched && !!error} width={width}>
      {/* use the spread operator to give the input all of the available properties from input
            will give us an onChange handler, onBlur handler, value etc*/}
      <textarea rows={rows} {...input} placeholder={placeholder} />
      {/* if the input has been touched, and we have an eror, then we will label the input as such */}
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default TextAreaInput