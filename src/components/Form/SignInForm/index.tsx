import { useContext, useState } from "react";
import { Button } from "../../Button";
import { IdentityContext } from "../../../contexts/IdentityContext";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignInProps } from "../../../contexts/IdentityContext/@types";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchema } from "./signInSchema";
import { useNavigate } from "react-router-dom";

export const SignInForm = () => {
  const [loading, setLoading] = useState(false);
  const { signIn } = useContext(IdentityContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInProps>({
    resolver: zodResolver(SignInSchema),
  });
  const submit: SubmitHandler<SignInProps> = (data) => {
    signIn(data, setLoading);
  };
  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="max-w-[411px] w-full h-full bg-[var(--color-white-10)] flex flex-col items-start p-11 rounded-[4px] max-h-[580px]"
    >
      <h2 className="title-form mb-2">Login</h2>
      <div className="flex flex-col w-full">
        <fieldset className="flex flex-col gap-y-2.5 mt-6">
          <label htmlFor="email" className="font-medium text-white">
            Email:
          </label>
          <input
            type="text"
            id="email"
            placeholder="Digite seu email"
            className="text-3 text-gray px-4 h-[48px] w-full border-[1.5px] border-gray-200 outline-none rounded placeholder-gray"
            disabled={loading}
            {...register("email")}
          />
          {errors.email && (
            <span className="text-red-600">{errors.email.message}</span>
          )}
        </fieldset>
        <fieldset className="w-full flex flex-col gap-y-2.5 mt-6">
          <label htmlFor="password" className="font-medium text-white">
            Senha:
          </label>
          <input
            type="password"
            id="password"
            placeholder="Digite sua senha"
            className="text-3 text-gray px-4 h-[48px] w-full border-[1.5px] border-gray-200 outline-none rounded placeholder-gray"
            disabled={loading}
            {...register("password")}
          />
          {errors.password && (
            <span className="text-red-600">{errors.password.message}</span>
          )}
        </fieldset>
        <span className="text-gray mt-2 text-end">Esqueci minha senha</span>
      </div>
      <div className="flex flex-col gap-6 w-full mt-5">
        <Button size="large" text="Entrar" type="submit" variant="brand1" />
        <span className=" text-gray text-center">Ainda não possui conta?</span>
        <Button
          size="large"
          text="Cadastrar"
          type="button"
          variant="outlinebrand1"
          onClick={() => navigate("/register")}
        />
      </div>
    </form>
  );
};
