// H1
export const H1 = ({ name, className }) => {
  return (
    <>
      <h1
        className={`mob:text-6xl laptop:text-9xl text-white font-bold ${className}`}
      >
        {name}
      </h1>
    </>
  );
};

// H2
export const H2 = ({ name, className }) => {
  return (
    <>
      <h2
        className={`text-xl tab:text-2xl laptop:text-2.5xl text-white font-bold ${className}`}
      >
        {name}
      </h2>
    </>
  );
};

// H3
export const H3 = ({ name, className }) => {
  return (
    <>
      <h3
        className={`mob:text-xl laptop:text-2xl text-white font-bold ${className}`}
      >
        {name}
      </h3>
    </>
  );
};

// H4
export const H4 = ({ name, className }) => {
  return (
    <>
      <h4
        className={`text-lg tab:text-2xl text-text-color-primary font-semibold ${className}`}
      >
        {name}
      </h4>
    </>
  );
};

// H5
export const H5 = ({ name, className }) => {
  return (
    <>
      <h5
        className={`mob:text-base tab:text-lg text-text-color-primary font-medium ${className}`}
      >
        {name}
      </h5>
    </>
  );
};

// H6
export const H6 = ({ name, className, ...props }) => {
  return (
    <>
      <h6
        className={` text-sm text-text-primary-color font-medium ${className}`}
        {...props}
      >
        {name}
      </h6>
    </>
  );
};

// P
export const P = ({ name, className }) => {
  return (
    <>
      <p
        className={`text-sm laptop:text-base text-text-color-primary font-normal ${className}`}
      >
        {name}
      </p>
    </>
  );
};
