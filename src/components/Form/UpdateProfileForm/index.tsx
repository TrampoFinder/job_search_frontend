import { useContext, useState } from "react";
import { IdentityContext } from "../../../contexts/IdentityContext";
import { SubmitHandler, useForm } from "react-hook-form";
import { UpdateUserProps } from "../../../contexts/IdentityContext/@types";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateProfileSchema } from "./updateProfileSchema";
import { DefaultButton } from "../../Buttons/DefaultButton";
import { JobManagementContext } from "../../../contexts/JobContext";

export const UpdateProfileForm = () => {
  const [loading, setLoading] = useState(false);
  const { updateUser, user } = useContext(IdentityContext);
  const { setIsModalOpen } = useContext(JobManagementContext);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UpdateUserProps>({
    mode: "onBlur",
    resolver: zodResolver(UpdateProfileSchema),
  });
  const submit: SubmitHandler<UpdateUserProps> = (data) => {
    updateUser(data, user!.id, setLoading);
  };
  const hasErrors = Object.keys(errors).length > 0;
  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-[14px]">
      <label htmlFor="firstName" className="flex flex-col text-white">
        Nome:
        <input
          id="firstName"
          type="text"
          {...register("firstName")}
          className={`border-1 border-gray-200 w-full h-[40px] px-4 rounded-[4px] ${
            hasErrors && errors.firstName?.message ? "border-red-500" : ""
          }`}
          placeholder={user?.firstName}
          disabled={loading}
        />
        {errors.firstName && (
          <p className="text-red-500">{errors.firstName.message}</p>
        )}
      </label>
      <label htmlFor="lastName" className="flex flex-col text-white">
        Sobrenome:
        <input
          id="lastName"
          type="text"
          {...register("lastName")}
          className={`border-1 border-gray-200 w-full h-[40px] px-4 rounded-[4px] ${
            hasErrors && errors.lastName?.message ? "border-red-500" : ""
          }`}
          placeholder={user?.lastName}
          disabled={loading}
        />
        {errors.lastName && (
          <p className="text-red-500">{errors.lastName.message}</p>
        )}
      </label>
      <label htmlFor="email" className="flex flex-col text-white">
        Email:
        <input
          id="email"
          type="email"
          value={user?.email}
          {...register("email")}
          className={`border-1 border-gray-200 w-full h-[40px] px-4 rounded-[4px] ${
            hasErrors && errors.email?.message ? "border-red-500" : ""
          }`}
          placeholder={user?.email}
          disabled={true}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </label>
      <label htmlFor="password" className="flex flex-col text-white">
        Senha:
        <input
          id="password"
          type="password"
          {...register("password")}
          className={`border-1 border-gray-200 w-full h-[40px] px-4 rounded-[4px] ${
            hasErrors && errors.password?.message ? "border-red-500" : ""
          }`}
          disabled={loading}
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
      </label>
      <div className="flex w-full gap-[33px] items-center justify-center mt-6">
        <DefaultButton
          variant="outlinebrand1"
          text="Fechar"
          size="medium"
          onClick={() => setIsModalOpen(false)}
        />
        <DefaultButton
          variant="brand1"
          text="Atualizar"
          size="medium"
          type="submit"
          disabled={!isValid}
        />
      </div>
    </form>
  );
};
