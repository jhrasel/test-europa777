"use client";

const PhotoResult = ({ imageData = {} }) => {
  const imageUrl = URL.createObjectURL(imageData.image);
  return (
    <div className="w-1/2">
      <img alt="Web component result" src={imageUrl} />
    </div>
  );
};

export default PhotoResult;
