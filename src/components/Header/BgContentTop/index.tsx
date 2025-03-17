import bgDash from "../../../assets/backgrounddash.png";
interface BgContentTopProps {
  children: React.ReactNode;
  height: keyof typeof maxHeightStyle;
}
const maxHeightStyle = {
  home: "max-h-[738px]",
  profile: "max-h-[350px]",
  profileUser: "max-h-[525px]",
};
export const BgContentTop = ({ children, height }: BgContentTopProps) => {
  return (
    <div
      className={`bg-cover w-full flex flex-col h-dvw ${maxHeightStyle[height]}`}
      style={{
        backgroundImage: `url(${bgDash})`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        overflow: "hidden",
      }}
    >
      <div className="flex flex-col justify-start h-dvw w-screen bg-black-75 backdrop-blur-md">
        {children}
      </div>
    </div>
  );
};
