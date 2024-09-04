"use client";

import "@innovatrics/dot-auto-capture-ui/magnifeye-liveness";
import { useEffect } from "react";

const MagnifEyeLivenessUi = (props) => {
  useEffect(() => {
    const uiElement = document.getElementById("x-dot-magnifeye-liveness-ui");

    if (uiElement) {
      uiElement.props = props;
    }
  });

  return <x-dot-magnifeye-liveness-ui id="x-dot-magnifeye-liveness-ui" />;
};

export default MagnifEyeLivenessUi;
