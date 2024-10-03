"use client";

import "@innovatrics/dot-auto-capture-ui/smile-liveness";
import { useEffect } from "react";

const SmileLivenessUi = (props) => {
  useEffect(() => {
    const uiElement = document.getElementById("x-dot-smile-liveness-ui");

    if (uiElement) {
      uiElement.props = props;
    }
  });

  return <x-dot-smile-liveness-ui id="x-dot-smile-liveness-ui" />;
};

export default SmileLivenessUi;
