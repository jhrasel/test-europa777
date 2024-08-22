import { UIImage } from "./Image";

export const ImageCard = ({ image, className }) => {
  return (
    <>
      <div
        className={`rounded-lg bg-bg-color3 group transition duration-300 ease-out hover:translate-y-[-3px] ${className}`}
      >
        <UIImage
          src={image}
          alt="img-card"
          className={`rounded-lg w-full !h-44 object-cover group-hover:blur-sm ${className}`}
        />
      </div>
    </>
  );
};
