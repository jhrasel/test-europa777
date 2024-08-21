import { Input } from "antd";

export const UIInput = ({
  type,
  name,
  value,
  placeholder,
  className,
  ...props
}) => {
  return (
    <>
      <Input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        className={`w-full px-4 py-2.5 text-sm text-bg-color1 placeholder:text-text-color-primary bg-[#f2f8ff] rounded-lg placeholder:text-sm ${className}`}
        {...props}
      />
    </>
  );
};
