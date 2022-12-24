import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Text, TextInput } from "@ignite-ui/react";
import { ArrowRight } from "phosphor-react";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormAnnotation } from "./styles";

const claimUsernameFormSchema = z.object({
  username: z
    .string({ required_error: "O nome de usuário é obrigatório." })
    .min(3, "O nome de usuário deve conter no mínimo 3 caracteres.")
    .regex(
      /^([a-z\\-]+)$/i,
      "O nome de usuário pode conter apenas letras e hifens.",
    )
    .transform(username => username.toLowerCase()),
});

type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>;

interface ClaimUsernameFormProps {}

export const ClaimUsernameForm: React.FC<ClaimUsernameFormProps> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(claimUsernameFormSchema),
    values: {
      username: "",
    },
  });

  const handleClaimUsername = handleSubmit(values => {
    console.log(values);
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

        <Button size="sm" type="submit">
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
