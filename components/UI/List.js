export const List = ({ children, className }) => {
  return (
    <>
      <ul className={`${className}`}>{children}</ul>
    </>
  );
};
