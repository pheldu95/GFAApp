import React from "react";
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps, Form, Label } from "semantic-ui-react";
import { DateTimePicker } from "react-widgets";

//had to change Date to any, for FieldRenderProps<any, HTMLElement> or else would error out
interface IProps
  extends FieldRenderProps<any, HTMLElement>,
    FormFieldProps {}

const DateInput: React.FC<IProps> = ({
  input,
  width,
  placeholder,
  date = false,
  time = false,
  meta: { touched, error },
//   ...rest
}) => {
  return (
    <Form.Field error={touched && !!error} width={width}>
      {/* can set date or time to false to make either one go away. so if only date is true, then the user will only see the date input, not the time */}
      <DateTimePicker
        placeholder={placeholder}
        value={input.value || null}
        onChange={input.onChange}
        //onBlur notifies the component that it's been touched
        onBlur={input.onBlur}
        // prevents the user from typing characters into the date and time fields
        onKeyDown={(e) => e.preventDefault()}
        date={date}
        time={time}
      />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default DateInput;
