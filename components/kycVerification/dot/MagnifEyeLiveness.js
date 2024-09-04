"use client";

import MagnifEyeLivenessCamera from "./MagnifEyeLivenessCamera";
import MagnifEyeLivenessUi from "./MagnifEyeLivenessUi";

const MagnifEyeLiveness = ({ onComplete, onError }) => {
  return (
    <div className="w-full relative overflow-hidden">
      <MagnifEyeLivenessCamera onComplete={onComplete} onError={onError} />
      <MagnifEyeLivenessUi showCameraButtons />
    </div>
  );
};

export default MagnifEyeLiveness;
