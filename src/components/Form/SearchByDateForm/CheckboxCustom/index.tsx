interface CheckboxCustomProps {
  text: string;
  quantity: number;
  value: string;
  onChange: (filter: string, checked: boolean) => void;
  checked: boolean;
}

export const CheckboxCustom = ({
  text,
  quantity,
  onChange,
  value,
  checked,
}: CheckboxCustomProps) => {
  return (
    <div className="flex items-center justify-between w-full ">
      <div className="flex items-center gap-2">
        <label
          htmlFor="checkbox-default"
          className="flex items-center cursor-pointer relative"
        >
          <input
            id="checkbox-default"
            type="checkbox"
            value={value}
            checked={checked}
            className="peer w-5 h-5 appearance-none border rounded-[4px] border-gray-600 cursor-pointer checked:bg-no-repeat checked:bg-center checked:border-brand-2 checked:bg-brand-1/20"
            onChange={(e) => onChange(value, e.target.checked)}
          />
          <span className="absolute text-brand-1 opacity-0 peer-checked:opacity-100 top-2.5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              viewBox="0 0 20 20"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </span>
        </label>
        <span className="text-gray-600">{text}</span>
      </div>
      <div className="flex items-center justify-center gap-2 bg-white w-[34px] h-[20px] rounded-[12px]">
        <span className="text-gray-600">{quantity}</span>
      </div>
    </div>
  );
};
