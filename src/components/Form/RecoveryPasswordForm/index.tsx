import { useState } from "react";
import { DefaultButton } from "../../Buttons/DefaultButton";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RecoveryPasswordSchema } from "./recoveryPasswordSchema";
import { api } from "../../../services";
import { useNavigate } from "react-router-dom";

interface RecoveryPasswordProps {
  email: string;
}

export const RecoveryPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecoveryPasswordProps>({
    resolver: zodResolver(RecoveryPasswordSchema),
  });
  const submit: SubmitHandler<RecoveryPasswordProps> = async (data) => {
    try {
      setLoading(true);
      const response = await api.post("/auth/recovery-password", data);
      if (response.status === 204) {
        setMessage(
          "Verifique seu e-mail para as instruções de recuperação de senha."
        );
        setTimeout(() => navigate("/sign-in"), 3000);
      }
    } catch (error) {
      setMessage("");
      throw error;
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {message !== "" ? (
        <div className="max-w-[411px] w-full h-min bg-[var(--color-white-10)] flex flex-col items-start p-8 rounded-[4px] max-h-[580px]">
          <h3 className="text-white text-lg">{message}</h3>
        </div>
      ) : (
        <div className="max-w-[411px] w-full h-min bg-[var(--color-white-10)] flex flex-col items-start p-8 rounded-[4px] max-h-[580px]">
          <h2 className="title-form text-2 sm:text-1 md:text-[20px] mb-2">
            Recovery password
          </h2>
          <form
            onSubmit={handleSubmit(submit)}
            className="flex-col flex w-full"
          >
            <div className="flex flex-col w-full gap-5">
              <fieldset className="flex flex-col gap-y-2.5 mt-3">
                <label htmlFor="email" className="font-medium text-white ">
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
              <DefaultButton
                size="large"
                text={loading ? "Enviando..." : "Enviar link de recuperação"}
                type="submit"
                variant="brand1"
                disabled={loading}
              />
            </div>
          </form>
          <DefaultButton size="large" variant="outlinebrand1" text="Voltar a pagina anterior" className="mt-5" onClick={() => navigate(-1)}/>
        </div>
      )}
    </>
  );
};
