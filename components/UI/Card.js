export const Card = ({ children, className }) => {
  return (
    <>
      <div
        className={`bg-[#2B2740] rounded-xl p-5 shadow-md mb-5 ${className}`}
      >
        {children}
      </div>
    </>
  );
};
