"use client";
import Image from "next/image";

export const UIImage = ({ src, alt, width = 400, height = 400, className }) => {
  return (
    <Image
      src={src}
      width={width}
      height={height}
      alt={`${alt}-image`}
      className={`w-full h-auto ${className}`}
      quality={60}
    />
  );
};
