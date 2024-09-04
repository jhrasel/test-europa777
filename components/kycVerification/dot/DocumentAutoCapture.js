"use client";

import DocumentCamera from "./DocumentCamera";
import DocumentUi from "./DocumentUi";

function DocumentAutoCapture({ onPhotoTaken, onError }) {
  const handlePhotoTaken = async (imageData, content) => {
    onPhotoTaken(imageData, content);
  };
  return (
    <>
      <div className="w-full relative overflow-hidden">
        <DocumentCamera
          cameraFacing="environment"
          onPhotoTaken={handlePhotoTaken}
          onError={onError}
        />
        <DocumentUi showCameraButtons />
      </div>
    </>
  );
}

export default DocumentAutoCapture;
