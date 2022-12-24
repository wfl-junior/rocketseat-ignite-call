import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextInput } from "@ignite-ui/react";
import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "./styles";

const claimUsernameFormSchema = z.object({
  username: z.string(),
});

type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>;

interface ClaimUsernameFormProps {}

export const ClaimUsernameForm: React.FC<ClaimUsernameFormProps> = () => {
  const { register, handleSubmit } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(claimUsernameFormSchema),
    values: {
      username: "",
    },
  });

  const handleClaimUsername = handleSubmit(values => {
    console.log(values);
  });

  return (
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
  );
};
