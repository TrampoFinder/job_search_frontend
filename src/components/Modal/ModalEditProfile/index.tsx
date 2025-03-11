import { UpdateProfileForm } from "../../Form/UpdateProfileForm";

export const ModalEditProfile = () => {
  return (
    <>
      <h3 className="text-2xl leading-tight font-bold text-brand-2 text-center">
        Deseja alterar o seu perfil?
      </h3>
      <UpdateProfileForm />
    </>
  );
};
