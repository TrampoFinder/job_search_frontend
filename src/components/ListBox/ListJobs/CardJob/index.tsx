import { useContext } from "react";
import clipPath from "../../../../assets/clipPath.svg";
import enterprise from "../../../../assets/enterprise.svg";
import mapPin from "../../../../assets/map-pin.svg";
import { DefaultButton } from "../../../Buttons/DefaultButton";
import { JobManagementContext } from "../../../../contexts/JobContext";
import { JobCardProps } from "../../../../contexts/JobContext/@types";
import { IdentityContext } from "../../../../contexts/IdentityContext";
import { useNavigate } from "react-router-dom";

export const CardJob = ({
  company,
  title,
  location,
  url,
  createdAt,
  id,
}: JobCardProps) => {
  const { setIsModalOpen, setJob } = useContext(JobManagementContext);
  const { user } = useContext(IdentityContext);
  const navigate = useNavigate();
  const handleClick = () => {
    if (user) {
      setJob({ title, id, url });
      setIsModalOpen(true);
    } else {
      navigate("/sign-in");
    }
  };
  const formatTimeDifference = () => {
    const date = new Date(createdAt!);
    const now = new Date();
    const diffInMillis = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMillis / 60000);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 60) {
      return `${diffInMinutes} min ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    } else {
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
    }
  };
  return (
    <li className="w-full max-h-[229px] h-full rounded-[20px] custom-shadow p-10 hover:scale-[102%] transition-transform duration-300 ease-out gap-6 flex flex-col">
      <div className="flex justify-between">
        <div className="bg-brand-2/20 p-2 text-brand-1 rounded-1 h-[28px] flex items-center">
          <span className="text-2">{formatTimeDifference()}</span>
        </div>
        <img src={clipPath} alt="Favorite" />
      </div>
      <div className="flex gap-5 h-[51px] items-center">
        <div className="flex items-center">
          <div className="bg-brand-1 rounded-full h-10 w-10 flex items-center justify-center border-2 border-brand-2 border-solid">
            <img src={enterprise} alt="Empresa" className="h-5 w-[5]" />
          </div>
        </div>
        <div className="flex flex-col gap-2 justify-start items-start">
          <h3 className="font-semibold text-[28px] leading-8">{title}</h3>
          <p className="text-2 leading-4">{company}</p>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <img src={mapPin} alt="Locale" />
          <p className="text-2 leading-4 font-medium text-gray-400">
            {location}
          </p>
        </div>
        <DefaultButton
          text="Cadastrar"
          size="small"
          variant="brand1"
          onClick={handleClick}
        />
      </div>
    </li>
  );
};
