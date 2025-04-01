import { BlackFooter } from "../../components/Footer";
import { DefaultHeader } from "../../components/Header/DefaultHeader";
import bgHeader from "../../assets/backgroundpage.jpg";
import { ResetPasswordForm } from "../../components/Form/ResetPasswordForm";

export const ResetPassword = () => {
  return (
    <div
      className="bg-cover bg-center w-full flex flex-col justify-start h-auto"
      style={{ backgroundImage: `url(${bgHeader})` }}
    >
      <div className="flex flex-col justify-start h-screen bg-black-75 backdrop-blur-[14px]">
        <DefaultHeader />
        <main className="container-apply flex items-center justify-center h-full">
          <ResetPasswordForm/>
        </main>
        <BlackFooter />
      </div>
    </div>
  );
};
