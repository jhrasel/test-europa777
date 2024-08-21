"use client";

import {
  applyPolyfills,
  defineCustomElements,
} from "@microblink/blinkcard-in-browser-sdk/ui/loader";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import "./_style.css";

export const CardScanner = ({ onScanSuccess, className = "" }) => {
  // Reference to the `<blinkcard-in-browser>` custom web component
  const el = useRef(null);

  useEffect(() => {
    if (!el.current) return;

    applyPolyfills().then(() => {
      defineCustomElements().then(() => {
        el.current.licenseKey = process.env.NEXT_PUBLIC_BLINK_KEY;
        el.current.recognizers = ["BlinkCardRecognizer"];

        // Correctly set the engine location to the directory
        el.current.engineLocation = window.location.origin + "/resources";
        el.current.allowHelloMessage = true;
        el.current.enableDrag = false;
        el.current.hideFeedback = true;
        // el.current.hideLoadingAndErrorUi = false;
        el.current.scanFromCamera = true;
        // el.current.scanFromImage = true;
        // el.current.cameraId = null;
        // el.current.translations = undefined;
        // el.current.iconCameraDefault = undefined;
        // el.current.iconCameraActive = undefined;
        // el.current.iconInvalidFormat = undefined;
        // el.current.iconSpinner = undefined;

        el.current.translations = {
          "action-message": "Scan your card to get verified",
        };

        // Event emitted when UI component cannot initialize
        el.current.addEventListener("fatalError", (ev) => {
          toast.error(
            "Something went wrong to load, please reload and try again."
          );
        });

        // Event emitted in case of error during scan action
        el.current.addEventListener("scanError", (ev) => {
          toast.error("Scanning is not complete, please reload and try again.");
        });

        // Event emitted when scan is successful
        el.current.addEventListener("scanSuccess", (ev) => {
          onScanSuccess(ev.detail);
        });

        // // Event emitted when UI component wants to display a feedback message to the user
        // el.current.addEventListener("feedback", (ev) => {
        //   console.log("feedback", ev);
        // });
      });
    });
  }, []);

  return (
    <div className={`${className}`}>
      <blinkcard-in-browser ref={el}></blinkcard-in-browser>
    </div>
  );
};
