import { useContext, useState } from "react";
import { DefaultButton } from "../../Buttons/DefaultButton";
import { IdentityContext } from "../../../contexts/IdentityContext";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterUserSchema } from "./registerUserSchema";
import { useNavigate } from "react-router-dom";
import { RegisterUserProps } from "../../../contexts/IdentityContext/@types";
import { InputForm } from "../Input";

export const RegisterUserForm = () => {
  const [loading, setLoading] = useState(false);
  const { registerUser } = useContext(IdentityContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUserProps>({
    resolver: zodResolver(RegisterUserSchema),
  });
  const submit: SubmitHandler<RegisterUserProps> = (data) => {
    registerUser(data, setLoading);
  };
  const hasErrors = Object.keys(errors).length > 0;
  return (
    <form
      onSubmit={handleSubmit(submit)}
      className={`max-w-[411px] w-full h-full bg-[var(--color-white-10)] flex flex-col items-start p-11 rounded-[4px] ${
        hasErrors ? "max-h-[760px]" : "max-h-[657px]"
      }`}
    >
      <h2 className="title-form">Cadastrar</h2>
      <div className="flex flex-col w-full mt-6 gap-3.5">
        <InputForm
          id="firstName"
          type="text"
          label="Nome"
          placeholder="Digite seu nome..."
          disabled={loading}
          register={{ ...register("firstName") }}
          errors={errors.firstName}
        />
        <InputForm
          id="lastName"
          type="text"
          label="Sobrenome"
          placeholder="Digite seu sobrenome..."
          disabled={loading}
          register={{ ...register("lastName") }}
          errors={errors.lastName}
        />
        <InputForm
          id="email"
          type="text"
          label="Email"
          placeholder="Digite seu email..."
          disabled={loading}
          register={{ ...register("email") }}
          errors={errors.email}
        />
        <InputForm
          id="password"
          type="password"
          label="Senha"
          placeholder="Digite sua senha..."
          disabled={loading}
          register={{...register("password") }}
          errors={errors.password}
        />
      </div>
      <div className="flex flex-col w-full mt-9 gap-8">
        <DefaultButton size="large" text="Cadastrar" type="submit" variant="brand1" />
        <DefaultButton
          size="large"
          text="Entrar"
          type="button"
          variant="outlinebrand1"
          onClick={() => navigate("/sign-in")}
        />
      </div>
    </form>
  );
};
