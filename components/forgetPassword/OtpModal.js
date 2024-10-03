// OtpModal.js
"use client";
import SubmitButton from "@/helpers/SubmitButton";
import useApi from "@/helpers/apiRequest";
import { useState } from "react";
import toast from "react-hot-toast";
import { ErrorMessage, H3, UIInput } from "../UI";

const OtpModal = ({ isOpen, onClose, email }) => {
  const { fetchData, isLoading } = useApi();
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleCodeChange = (e) => {
    setCode(e.target.value);
    setError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError("");
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    if (code.trim().length !== 6 || password.trim().length < 6) {
      setError(
        "Please enter a valid 6-digit code and a password with at least 6 characters."
      );
      return;
    }

    // Log the payload for debugging
    console.log("Submitting OTP with payload:", { email, code, password });

    const { data, error } = await fetchData(`/setPassword`, "POST", {
      email,
      code,
      password,
    });

    // Log the API response for debugging
    console.log("API Response:", { data, error });

    if (data) {
      toast.success("Password has been successfully reset.");
      onClose();
    } else if (error) {
      toast.error(error.message);
      setError(error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999] w-full h-full">
      <div className="bg-bg-color2 shadow p-6 rounded-lg w-[90%] tab:w-[400px]">
        <H3 name="Reset Your Password" className="mb-5 text-center" />
        <form onSubmit={handleOtpSubmit}>
          <UIInput
            type="text"
            name="code"
            placeholder="Enter OTP code"
            value={email}
            className="rounded-lg mb-3 !text-white"
            disabled
          />

          <UIInput
            type="text"
            name="code"
            placeholder="Enter OTP code"
            value={code}
            onChange={handleCodeChange}
            className="rounded-lg mb-3"
          />
          <UIInput
            type="password"
            name="password"
            placeholder="Enter new password"
            value={password}
            onChange={handlePasswordChange}
            className="rounded-lg mb-3"
          />
          {error && <ErrorMessage errorName={error} />}
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="text-white border border-border-color rounded-full py-1 tab:py-2.5 px-5 mt-4 w-auto"
            >
              Cancel
            </button>
            <SubmitButton
              name="Reset Password"
              isLoading={isLoading}
              className="!mt-0"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default OtpModal;
