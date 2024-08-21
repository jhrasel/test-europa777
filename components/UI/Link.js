import Link from "next/link";

export const UILink = ({ href, className, icon, name, ...props }) => {
  return (
    <>
      <Link
        href={href}
        {...props}
        className={`text-sm laptop:text-base inline-flex items-center gap-2 font-normal text-white ${className}`}
      >
        {icon && <span className={`text-base tab:text-xl leading-0`}>{icon}</span>}
        {name}
      </Link>
    </>
  );
};

export const UILinkBG = ({ href, className, icon, name, ...props }) => {
  return (
    <>
      <Link
        href={href}
        {...props}
        className={` link__bg ease-out duration-150 text-white py-1 laptop:py-1.5 px-4 tab:px-5 laptop:px-8 rounded-full text-base laptop:text-lg inline-flex items-center gap-2 font-normal border-2 border-blue-color ${className}`}
      >
        {icon && <span className={`text-lg`}>{icon}</span>}
        {name}
      </Link>
    </>
  );
};
