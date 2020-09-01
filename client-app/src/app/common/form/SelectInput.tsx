import React from "react";
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps, Form, Label, Select } from "semantic-ui-react";

//THIS component is our select input, we can use it anywhere in our app that needs a select input

//typing
//because it's a text input, it will be getting a number, and an HTML Element
//we will also be using FormFieldProps from Semantic UI
interface IProps
  extends FieldRenderProps<number, HTMLElement>,
    FormFieldProps {}

const SelectInput: React.FC<IProps> = ({
  input,
  width,
  options,
  placeholder,
  meta: { touched, error },
}) => {
  return (
    <Form.Field error={touched && !!error} width={width}>
      {/* use the spread operator to give the input all of the available properties from input
            will give us an onChange handler, onBlur handler, value etc*/}
        <Select
            value={input.value}
            onChange={(e, data) => input.onChange(data.value)}
            placeholder={placeholder}
            options={options}
        />    
      {/* if the input has been touched, and we have an eror, then we will label the input as such */}
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default SelectInput