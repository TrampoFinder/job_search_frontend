import bgDash from "../../../assets/backgrounddash.png";
interface BgContentTopProps {
  children: React.ReactNode;
  size?: number;
}

export const BgContentTop = ({ children, size }: BgContentTopProps) => {
  return (
    <div
      className={`bg-cover flex flex-col h-[500px] sm:h-96 md:h-[525px] lg:h-[525px] w-screen`}
      style={{
        backgroundImage: `url(${bgDash})`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        overflow: "hidden",
        height: `${size}px`,
      }}
    >
      <div
        className={`flex flex-col justify-start h-full sm:h-96 md:h-screen w-screen bg-black-75 backdrop-blur-md`}
        style={{ height: `${size}px` }}
      >
        {children}
      </div>
    </div>
  );
};
