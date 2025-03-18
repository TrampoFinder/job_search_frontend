import bgDash from "../../../assets/backgrounddash.png";
interface BgContentTopProps {
  children: React.ReactNode;
}

export const BgContentTop = ({ children }: BgContentTopProps) => {
  return (
    <div
      className={`bg-cover flex flex-col h-[500px] sm:h-96 md:h-[525px] lg:h-[525px] w-screen`}
      style={{
        backgroundImage: `url(${bgDash})`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        overflow: "hidden",
      }}
    >
      <div className="flex flex-col justify-start sm:h-96 h-screen md:h-screen w-screen bg-black-75 backdrop-blur-md">
        {children}
      </div>
    </div>
  );
};
