import { Text, TextArea, TextAreaProps } from "@ignite-ui/react";
import { forwardRef } from "react";
import { ErrorMessage, TextAreaControlContainer } from "./styles";

interface TextAreaControlProps extends TextAreaProps {
  label: string;
  errorMessage?: string;
}

export const TextAreaControl = forwardRef<
  HTMLTextAreaElement,
  TextAreaControlProps
>(
  ({ label, errorMessage, ...props }, ref): JSX.Element => (
    <TextAreaControlContainer>
      <Text as="label" size="sm" htmlFor={props.name}>
        {label}
      </Text>

      <TextArea ref={ref} id={props.name} {...props} />

      {errorMessage ? (
        <ErrorMessage size="sm" as="span">
          {errorMessage}
        </ErrorMessage>
      ) : null}
    </TextAreaControlContainer>
  ),
);

TextAreaControl.displayName = "TextAreaControl";
