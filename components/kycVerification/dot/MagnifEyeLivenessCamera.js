"use client";

import "@innovatrics/dot-magnifeye-liveness";
import { useEffect } from "react";

/*
 * When component is initiliazed, sam.wasm file will be fetched from http://localhost:3000/sam.wasm.
 * That's why sam.wasm file need to be placed in root of public folder.
 */

const MagnifEyeLivenessCamera = (props) => {
  useEffect(() => {
    // 2. Init existed custom web-component
    const magnifEyeLivenessHTMLElement = document.getElementById(
      "x-dot-magnifeye-liveness"
    );

    if (magnifEyeLivenessHTMLElement) {
      magnifEyeLivenessHTMLElement.props = props;
    }
  });
  // 1. Return empty custom web-component html TAG
  return <x-dot-magnifeye-liveness id="x-dot-magnifeye-liveness" />;
};

export default MagnifEyeLivenessCamera;
