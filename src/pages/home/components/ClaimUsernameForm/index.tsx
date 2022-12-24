import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Text, TextInput } from "@ignite-ui/react";
import { useRouter } from "next/router";
import { ArrowRight } from "phosphor-react";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import {
  ClaimUsernameFormData,
  claimUsernameFormSchema,
} from "~/validation/claim-username";
import { Form, FormAnnotation } from "./styles";

interface ClaimUsernameFormProps {}

export const ClaimUsernameForm: React.FC<ClaimUsernameFormProps> = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(claimUsernameFormSchema),
    defaultValues: {
      username: "",
    },
  });

  const handleClaimUsername = handleSubmit(async data => {
    await router.push(`/register?username=${data.username}`);
  });

  return (
    <Fragment>
      <Form as="form" onSubmit={handleClaimUsername}>
        <TextInput
          size="sm"
          prefix="ignite.com/"
          placeholder="seu-usuario"
          {...register("username")}
        />

        <Button size="sm" type="submit" disabled={isSubmitting}>
          Reservar
          <ArrowRight />
        </Button>
      </Form>

      <FormAnnotation>
        <Text size="sm" as="span">
          {errors.username
            ? errors.username.message
            : "Digite o nome do usuário desejado"}
        </Text>
      </FormAnnotation>
    </Fragment>
  );
};
