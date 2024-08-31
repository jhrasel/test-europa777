"use client";

import { useState } from "react";
import BonusRegister from "./BonusRegister";
import SignUpFormWrapper from "./SignUpFormWrapper";

export default function SignUpWrapper({ handleSignUpSuccess }) {
  const [showBonusRegister, setShowBonusRegister] = useState(true);

  const handleChooseClick = () => {
    setShowBonusRegister(false);
  };

  return (
    <>
      {showBonusRegister ? (
        <BonusRegister onChoose={handleChooseClick} />
      ) : (
        <SignUpFormWrapper handleSignUpSuccess={handleSignUpSuccess} />
      )}
    </>
  );
}
