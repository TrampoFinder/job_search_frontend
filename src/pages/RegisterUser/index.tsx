import { RegisterUserForm } from "../../components/Form/RegisterUserForm";

import bgHeader from "../../assets/backgroundpage.jpg";
import { BlackFooter } from "../../components/Footer";
import { DefaultHeader } from "../../components/Header/DefaultHeader";

export const RegisterUser = () => {
  return (
    <div
      className="bg-cover bg-center w-full flex flex-col justify-start h-auto"
      style={{ backgroundImage: `url(${bgHeader})` }}
    >
      <div className="flex flex-col justify-start h-screen bg-black-75 backdrop-blur-[14px]">
        <DefaultHeader />
        <main className="container-apply flex items-center justify-center h-full">
          <RegisterUserForm />
        </main>
        <BlackFooter />
      </div>
    </div>
  );
};
