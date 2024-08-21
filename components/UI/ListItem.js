import React from 'react';

export const ListItem = ({ children, className, ...props }) => {
  return (
    <>
      <li className={`${className}`} {...props}>
        {children}
      </li>
    </>
  );
};

