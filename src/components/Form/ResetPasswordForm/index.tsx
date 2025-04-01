/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { DefaultButton } from "../../Buttons/DefaultButton";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetPasswordSchema } from "./resetPasswordSchema";
import { api } from "../../../services";
import { useNavigate, useParams } from "react-router-dom";

interface ResetPasswordProps {
  password: string;
  confirmPassword: string;
  recoveryCode: string;
}

export const ResetPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordProps>({
    mode: "onBlur",
    resolver: zodResolver(ResetPasswordSchema),
  });
  const submit: SubmitHandler<ResetPasswordProps> = async (data) => {
    try {
      setLoading(true);
      const response = await api.post(`/auth/reset-password/${token}`, {
        password: data.password,
        recoveryCode: data.recoveryCode
      });
      if (response.status === 204) {
        navigate("/sign-in", { replace: true });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="max-w-[411px] w-full h-min bg-[var(--color-white-10)] flex flex-col items-start p-8 rounded-[4px] max-h-[580px]"
    >
      <h2 className="title-form text-2 sm:text-1 md:text-[20px] mb-2">
        Recovery password
      </h2>
      <div className="flex flex-col w-full gap-5">
        <fieldset className="flex flex-col gap-y-2.5 mt-3">
          <label htmlFor="email" className="font-medium text-white ">
            Nova senha:
          </label>
          <input
            type="password"
            id="password"
            placeholder="Digite sua nova senha..."
            className="text-3 text-gray px-4 h-[48px] w-full border-[1.5px] border-gray-200 outline-none rounded placeholder-gray"
            disabled={loading}
            {...register("password")}
          />
          {errors.password && (
            <span className="text-red-600">{errors.password.message}</span>
          )}
        </fieldset>
        <fieldset className="flex flex-col gap-y-2.5 mt-3">
          <label htmlFor="email" className="font-medium text-white ">
            Confirmar senha:
          </label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Digite a confirmação da senha..."
            className="text-3 text-gray px-4 h-[48px] w-full border-[1.5px] border-gray-200 outline-none rounded placeholder-gray"
            disabled={loading}
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <span className="text-red-600">
              {errors.confirmPassword.message}
            </span>
          )}
        </fieldset>
        <fieldset className="flex flex-col gap-y-2.5 mt-3">
          <label htmlFor="email" className="font-medium text-white ">
            Digite o código de recuperação:
          </label>
          <input
            type="text"
            id="recoveryToken"
            placeholder="Digite o código de recuperação..."
            className="text-3 text-gray px-4 h-[48px] w-full border-[1.5px] border-gray-200 outline-none rounded placeholder-gray"
            disabled={loading}
            {...register("recoveryCode")}
          />
          {errors.recoveryCode && (
            <span className="text-red-600">{errors.recoveryCode.message}</span>
          )}
        </fieldset>
        <DefaultButton
          size="large"
          text={loading ? "Redefinindo..." : "Redefinir senha"}
          type="submit"
          variant="brand1"
          disabled={loading}
        />
      </div>
      
    </form>
  );
};
