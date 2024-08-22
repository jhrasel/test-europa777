// H1
export const H1 = ({ text, className, ...props }) => {
  return (
    <h1
      className={`mob:text-6xl laptop:text-9xl text-white font-bold ${className}`}
      {...props}
    >
      {text}
    </h1>
  );
};

// H2
export const H2 = ({ text, className, ...props }) => {
  return (
    <h2
      className={`text-xl tab:text-2xl laptop:text-2.5xl text-white font-bold ${className}`}
      {...props}
    >
      {text}
    </h2>
  );
};

// H3
export const H3 = ({ text, className, ...props }) => {
  return (
    <h3
      className={`mob:text-xl laptop:text-2xl text-white font-bold ${className}`}
      {...props}
    >
      {text}
    </h3>
  );
};

// H4
export const H4 = ({ text, className, ...props }) => {
  return (
    <h4
      className={`text-lg tab:text-2xl text-text-color-primary font-semibold ${className}`}
      {...props}
    >
      {text}
    </h4>
  );
};

// H5
export const H5 = ({ text, className, ...props }) => {
  return (
    <h5
      className={`mob:text-base tab:text-lg text-text-color-primary font-medium ${className}`}
      {...props}
    >
      {text}
    </h5>
  );
};

// H6
export const H6 = ({ text, className, ...props }) => {
  return (
    <h6
      className={`text-sm text-text-primary-color font-medium ${className}`}
      {...props}
    >
      {text}
    </h6>
  );
};

// P
export const P = ({ text, className, ...props }) => {
  return (
    <p
      className={`text-sm laptop:text-base text-text-color-primary font-normal ${className}`}
      {...props}
    >
      {text}
    </p>
  );
};
