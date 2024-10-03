"use client";

import SmileLivenessCamera from "./SmileLivenessCamera";
import SmileLivenessUi from "./SmileLivenessUi";

const SmileLiveness = ({ onComplete, onError }) => {
  return (
    <div className="w-full relative overflow-hidden">
      <SmileLivenessCamera onComplete={onComplete} onError={onError} />
      <SmileLivenessUi showCameraButtons />
    </div>
  );
};

export default SmileLiveness;
