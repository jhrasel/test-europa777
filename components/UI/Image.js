"use client";
import Image from "next/image";

export const UIImage = ({ src, alt, className }) => {
  return (
    <>
      <Image
        src={src}
        width="1900"
        height="500"
        alt={`${alt}-image`}
        className={`w-full h-auto ${className}`}
        quality={50}
      />
    </>
  );
};
