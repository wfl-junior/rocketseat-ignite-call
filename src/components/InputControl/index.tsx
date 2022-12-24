import { Text, TextInput, TextInputProps } from "@ignite-ui/react";
import { forwardRef } from "react";
import { ErrorMessage, InputControlContainer } from "./styles";

interface InputControlProps extends TextInputProps {
  label: string;
  errorMessage?: string;
}

export const InputControl = forwardRef<HTMLInputElement, InputControlProps>(
  ({ label, errorMessage, ...props }, ref): JSX.Element => (
    <InputControlContainer>
      <Text as="label" size="sm" htmlFor={props.name}>
        {label}
      </Text>

      <TextInput ref={ref} id={props.name} {...props} />

      {errorMessage && (
        <ErrorMessage size="sm" as="span">
          {errorMessage}
        </ErrorMessage>
      )}
    </InputControlContainer>
  ),
);

InputControl.displayName = "InputControl";
