export const ToggleViewButton = ({
  view = "grid",
  onViewChange,
}: {
  view: string;
  onViewChange: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="inline-flex rounded-3xl border-2 cursor-pointer border-brand-2 overflow-hidden transition-all duration-500 ease-in-out">
      <button
        onClick={() => onViewChange?.("grid")}
        className={`px-3 py-1.5 transition-all duration-500 ease-in-out ${
          view === "grid"
            ? "bg-gradient-to-br from-brand-1 to-[#C4B5FD] text-white"
            : "bg-[#F3F0FF] text-brand-1 hover:shadow-lg"
        }`}
      >
        <i className="fas fa-th-large text-xs"></i>
      </button>
      <button
        onClick={() => onViewChange?.("list")}
        className={`px-3 py-1.5 transition-all duration-500 ease-in-out ${
          view === "list"
            ? "bg-gradient-to-br from-brand-1 to-[#C4B5FD] text-white"
            : "bg-[#F3F0FF] text-brand-1 hover:shadow-lg"
        }`}
      >
        <i className="fas fa-list text-xs"></i>
      </button>
    </div>
  );
};
