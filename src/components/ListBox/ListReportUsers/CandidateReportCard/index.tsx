import chevronRight from "../../../../assets/chevron-right.svg";
import user from "../../../../assets/user.svg";
export const CandidateReportCard = () => {
  return (
    <div className="bg-white p-2.5 hover:bg-gray-50 transition-all custom-shadow-40 cursor-pointer group rounded-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-11 h-11 bg-gradient-to-br from-[#8B5CF6] to-[#C4B5FD] rounded-full flex items-center justify-center shadow-sm ring-2 ring-purple-100">
            <img src={user} alt="user" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-800 font-roboto mb-0.5">
              Andrew da Silva
            </h3>
            <div className="flex items-center text-xs text-gray-500">
              <i className="fas fa-briefcase mr-1.5 text-[#8B5CF6] opacity-75"></i>
              <span>6 vagas em andamento</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-5">
          <div className="text-center">
            <div className="text-xs font-medium text-gray-500 mb-1">
              Aplicadas
            </div>
            <div className="text-sm font-semibold text-[#8B5CF6] bg-[#F3F0FF] px-2.5 py-0.5 rounded-full">
              2
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs font-medium text-gray-500 mb-1">
              Em processo
            </div>
            <div className="text-sm font-semibold text-[#C4B5FD] bg-[#F3F0FF] px-2.5 py-0.5 rounded-full">
              3
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs font-medium text-gray-500 mb-1">
              Aprovadas
            </div>
            <div className="text-sm font-semibold text-[#DDD6FE] bg-[#F3F0FF] px-2.5 py-0.5 rounded-full">
              1
            </div>
          </div>

          <button className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-[#8B5CF6] hover:bg-[#F3F0FF] rounded-full transition-all group-hover:bg-[#F3F0FF] group-hover:text-[#8B5CF6]">
            <img src={chevronRight} alt="chevronRight" className="" />
          </button>
        </div>
      </div>
    </div>
  );
};
