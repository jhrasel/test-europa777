import { Button } from "antd";

export const UIButton = ({ name, className, icon, onClick, ...props }) => {
  return (
    <Button
      type="submit"
      htmlType="submit"
      className={` link__bg !bg-blue-color !border-2 !border-blue-color !text-base tab:!text-lg !py-1 tab:!py-2 !px-4 tab:!px-10 !h-auto ease-out duration-150 !text-white inline-flex items-center gap-2 font-normal justify-center ${className}`}
      onClick={onClick}
      {...props}
    >
      {icon && <span>{icon}</span>}
      {name}
    </Button>
  );
};

export const UIButtonWithoutBG = ({
  name,
  className,
  icon,
  onClick,
  ...props
}) => {
  return (
    <Button
      type="submit"
      htmlType="submit"
      className={`!border-2  !border-blue-color !text-base tab:!text-lg !py-1 tab:!py-2 !px-4 tab:!px-10  !h-auto ease-out duration-150 !text-white inline-flex items-center gap-2 font-normal justify-center ${className}`}
      onClick={onClick}
      {...props}
    >
      {icon && <span>{icon}</span>}
      {name}
    </Button>
  );
};
