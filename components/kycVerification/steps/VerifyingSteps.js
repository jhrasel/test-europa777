"use client";

import { useState, useEffect } from "react";
import { Steps } from "antd";

export const VerifyingSteps = () => {
  // Initial state for the current step index
  const [current, setCurrent] = useState(0);

  // Define the base titles and their corresponding processing and processed states
  const stepsData = [
    { processing: "Photos processing", processed: "Photos processed" },
    {
      processing: "Image quality checking",
      processed: "Image quality checked",
    },
    { processing: "Document inspecting", processed: "Document inspected" },
    { processing: "Biometrics verifying", processed: "Biometrics verified" },
    { processing: "Finalizing the decision", processed: "Decision finalized" },
  ];

  // Generate dynamic titles based on the current step
  const items = stepsData.map((step, index) => {
    if (index < current) {
      return { title: step.processed };
    } else if (index === current) {
      return { title: step.processing };
    } else {
      return { title: step.processed.split(" ")[0] + " pending" }; // Return a simplified version for pending steps
    }
  });

  // Simulate step progression
  useEffect(() => {
    if (current < stepsData.length - 1) {
      const timer = setTimeout(() => {
        setCurrent(current + 1);
      }, 1000); // Change step every 2 seconds for demonstration

      return () => clearTimeout(timer);
    }
  }, [current, stepsData.length]);

  return (
    <Steps direction="vertical" size="small" current={current} items={items} />
  );
};
