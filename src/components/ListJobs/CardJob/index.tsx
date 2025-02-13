import clipPath from "../../../assets/clipPath.svg";
import enterprise from "../../../assets/enterprise.svg";
import mapPin from "../../../assets/map-pin.svg";
import { Button } from "../../Button";

interface JobCardProps {
  company: string;
  title: string;
  status?: string;
  location?: string;
  createdAt?: Date;
}
export const CardJob = ({
  company,
  title,
  location,
  // createdAt,
}: JobCardProps) => {
  return (
    <li className="w-full max-h-[229px] h-full rounded-[20px] custom-shadow p-10 hover:scale-[102%] transition-transform duration-300 ease-out gap-6 flex flex-col">
      <div className="flex justify-between">
        <div className="bg-brand-2/20 p-2 text-brand-1 rounded-1 h-[28px] flex items-center">
          <span className="text-2">10 min ago</span>
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
        <Button text="Cadastrar" size="small" variant="brand1" />
      </div>
    </li>
  );
};
