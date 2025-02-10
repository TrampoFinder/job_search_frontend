import { useContext, useState } from "react";
import { Button } from "../../Button";
import { IdentityContext } from "../../../contexts/IdentityContext";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterUserSchema } from "./registerUserSchema";
import { useNavigate } from "react-router-dom";
import { RegisterUserProps } from "../../../contexts/IdentityContext/@types";

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
        <fieldset className="w-full flex flex-col">
          <label htmlFor="firstName" className="text-3 font-medium text-white">
            Nome:
          </label>
          <input
            type="text"
            id="firstName"
            placeholder="Digite seu sobrenome"
            className="text-3 text-gray px-4 h-[48px] w-full border-[1.5px] border-gray-200 outline-none rounded placeholder-gray mt-2.5"
            disabled={loading}
            {...register("firstName")}
          />
          {errors.username && (
            <span className="text-red-600 text-3 inline-block">
              {errors.username.message}
            </span>
          )}
        </fieldset>
        <fieldset className="w-full flex flex-col">
          <label htmlFor="lastName" className="text-3 font-medium text-white">
            Sobrenome:
          </label>
          <input
            type="text"
            id="lastName"
            placeholder="Digite seu sobrenome"
            className="text-3 text-gray px-4 h-[48px] w-full border-[1.5px] border-gray-200 outline-none rounded placeholder-gray mt-2.5"
            disabled={loading}
            {...register("lastName")}
          />
          {errors.username && (
            <span className="text-red-600 text-3 inline-block">
              {errors.username.message}
            </span>
          )}
        </fieldset>
        <fieldset className="flex flex-col">
          <label htmlFor="email" className="text-3 font-medium text-white">
            Email:
          </label>
          <input
            type="text"
            id="email"
            placeholder="Digite seu email"
            className="text-3 text-gray px-4 h-[48px] w-full border-[1.5px] border-gray-200 outline-none rounded placeholder-gray mt-2.5"
            disabled={loading}
            {...register("email")}
          />
          {errors.email && (
            <span className="text-red-600 text-3 inline-block">
              {errors.email.message}
            </span>
          )}
        </fieldset>
        <fieldset className="w-full flex flex-col">
          <label htmlFor="password" className="text-3 font-medium text-white">
            Senha:
          </label>
          <input
            type="password"
            id="password"
            placeholder="Digite sua senha"
            className="text-3 text-gray px-4 h-[48px] w-full border-[1.5px] border-gray-200 outline-none rounded placeholder-gray mt-2.5"
            disabled={loading}
            {...register("password")}
          />
          {errors.password && (
            <span className="text-red-600 text-3 inline-block">
              {errors.password.message}
            </span>
          )}
        </fieldset>
      </div>
      <div className="flex flex-col w-full mt-9 gap-8">
        <Button size="large" text="Cadastrar" type="submit" variant="brand1" />
        <Button
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
