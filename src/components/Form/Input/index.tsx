import { FieldError } from "react-hook-form";

interface InputForm {
  id: string;
  type: string;
  placeholder: string;
  disabled?: boolean;
  label: string;
  register: object;
  value?: string | number | readonly string[] | undefined;
  defaultValue?: string | number | readonly string[] | undefined;
  className?: string;
  errors?: FieldError | undefined;
}
export const InputForm = ({
  id,
  type,
  placeholder,
  disabled,
  label,
  register,
  value,
  className,
  defaultValue,
  errors,
}: InputForm) => {
  return (
    <fieldset className="w-full flex flex-col">
      <label htmlFor={id} className="text-3 font-medium text-white">
        {label}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className={`text-3 text-gray px-4 h-[48px] w-full border-[1.5px] border-gray-200 outline-none rounded placeholder-gray mt-2.5 ${className}`}
        disabled={disabled}
        {...register}
        value={value}
        defaultValue={defaultValue}
      />
      {errors && (
        <span className="text-red-600 text-3 inline-block">
          {errors.message}
        </span>
      )}
    </fieldset>
  );
};
