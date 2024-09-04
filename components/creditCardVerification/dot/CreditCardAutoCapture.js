"use client"

import CreditCardCamera from "./CreditCardCamera";
import CreditCardUi from "./CreditCardUi";

function CreditCardAutoCapture({ onPhotoTaken, onError }) {
  const handlePhotoTaken = async (imageData, content) => {
    onPhotoTaken(imageData, content);
  };
  return (
    <>
      <div className="w-full relative overflow-hidden">
        <CreditCardCamera
          cameraFacing="environment"
          onPhotoTaken={handlePhotoTaken}
          onError={onError}
        />
        <CreditCardUi
          showCameraButtons
          instructions={{
            document_centering: "Center credit card",
            document_not_present: "Scan credit card",
          }}
        />
      </div>
    </>
  );
}

export default CreditCardAutoCapture;
