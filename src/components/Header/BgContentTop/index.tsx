import bgDash from "../../../assets/backgrounddash.png";
interface BgContentTopProps {
  children: React.ReactNode;
  height: keyof typeof maxHeightStyle;
}
const maxHeightStyle = {
  home: "max-h-[738px]",
  profile: "max-h-[350px]",
};
export const BgContentTop = ({ children, height }: BgContentTopProps) => {
  return (
    <div
      className={`bg-cover w-full flex flex-col h-screen ${maxHeightStyle[height]}`}
      style={{
        backgroundImage: `url(${bgDash})`,
        overflow: "hidden",
      }}
    >
      <div className="flex flex-col justify-start h-screen w-full bg-black-75 backdrop-blur-[14px]">
        {children}
      </div>
    </div>
  );
};
