import { useContext, useRef } from "react";
import { IdentityContext } from "../../../contexts/IdentityContext";
import { useOutClick } from "../../../hooks/useOutClick";
import { useNavigate } from "react-router-dom";

export const DropdownUser = ({
  initials,
  firstName,
}: {
  initials: string;
  firstName: string;
}) => {
  const { isDropdownOpen, setIsDropdownOpen } = useContext(IdentityContext);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { setUser } = useContext(IdentityContext);
  useOutClick(dropdownRef, () => setIsDropdownOpen(false));
  const onLogout = () => {
    localStorage.removeItem("@TOKEN");
    setUser(null);
    navigate("/", { replace: true });
    setIsDropdownOpen(false);
  };
  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-full hover:bg-brand-2/20 transition-all duration-300 "
      >
        {/* <div className="w-8 h-8 bg-gradient-to-br from-[#8B5CF6] to-[#C4B5FD] rounded-full flex items-center justify-center text-white text-sm font-medium"> */}
        <div className="text-white rounded-full bg-white/10 w-8 h-8 flex items-center justify-center custom-shadow-40">
          {initials}
        </div>
        <span className="font-bold leading-0 text-white">{firstName}</span>
        <i
          className={`fas fa-chevron-down text-gray-400 text-xs transition-transform duration-300 ${
            isDropdownOpen ? "rotate-180" : ""
          }`}
        ></i>
      </button>
      <div
        className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 origin-top-right ${
          isDropdownOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="py-1">
          <button
            onClick={() => {
              //   onEditProfile?.();
              setIsDropdownOpen(false);
            }}
            className="w-full px-4 py-2 text-left text-gray-700 hover:bg-[#F3F0FF] transition-colors duration-300 flex items-center space-x-2"
          >
            <i className="fas fa-user text-gray-400"></i>
            <span>Editar Perfil</span>
          </button>
          <button
            onClick={() => {
              onLogout();
              setIsDropdownOpen(false);
            }}
            className="w-full px-4 py-2 text-left text-gray-700 hover:bg-[#F3F0FF] transition-colors duration-300 flex items-center space-x-2"
          >
            <i className="fas fa-sign-out-alt text-gray-400"></i>
            <span>Sair</span>
          </button>
        </div>
      </div>
    </div>
  );
};
