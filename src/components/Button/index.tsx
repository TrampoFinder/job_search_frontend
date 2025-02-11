export interface ButtonPrimary {
  variant: keyof typeof variantStyle;
  text: string;
  size: keyof typeof sizeStyle;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
  onClick?: (e: unknown) => void;
  register?: object;
  icon?: string | undefined;
}

const sizeStyle = {
  small: "button-small",
  medium: "button-medium",
  large: "button-large",
};

const variantStyle = {
  brand1:
    "bg-brand-1 hover:bg-brand-2 text-white text-2 font-semibold border-brand-2 border-solid border-2 rounded-[8px] cursor-pointer",
  outlinebrand1:
    "border-brand-1 border-solid text-brand-2 bg-transparent border-3 text-2 font-semibold rounded-[8px] hover:bg-brand-2 hover:text-white cursor-pointer",
};

export const Button = ({
  variant,
  text,
  size,
  className,
  type,
  disabled,
  onClick,
  register,
  icon,
}: ButtonPrimary) => {
  return (
    <button
      className={`button ${className} ${variantStyle[variant]} ${sizeStyle[size]}`}
      type={type}
      disabled={disabled}
      onClick={onClick}
      {...register}
    >
      {icon ? (
        <div className="flex items-center justify-center gap-2.5">
          <img src={icon} alt="" />
          {text}
        </div>
      ) : (
        text
      )}
    </button>
  );
};
