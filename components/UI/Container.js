export const Container = ({ children, className }) => {
  return (
    <div
      className={` container mob:max-w-full px-4 laptop:px-6 desktop:px-16 ${className}`}
    >
      {children}
    </div>
  );
};
