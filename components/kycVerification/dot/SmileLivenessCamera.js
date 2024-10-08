"use client";

import "@innovatrics/dot-smile-liveness";
import { useEffect } from "react";

/*
 * When component is initiliazed, sam.wasm file will be fetched from http://localhost:3000/sam.wasm.
 * That's why sam.wasm file need to be placed in root of public folder.
 */

const SmileLivenessCamera = (props) => {
  useEffect(() => {
    // 2. Init existed custom web-component
    const smileLivenessHTMLElement = document.getElementById(
      "x-dot-smile-liveness"
    );

    if (smileLivenessHTMLElement) {
      smileLivenessHTMLElement.props = props;
    }
  });
  // 1. Return empty custom web-component html TAG
  return <x-dot-smile-liveness id="x-dot-smile-liveness" />;
};

export default SmileLivenessCamera;
