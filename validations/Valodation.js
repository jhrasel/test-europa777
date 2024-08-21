import * as Yup from "yup";

// loginValidation
export const loginValidation = Yup.object({
  email: Yup.string().required("Enter your email"),
  password: Yup.string().required("Enter your password"),
});

// registrationValidation
export const registrationValidation = Yup.object({
  email: Yup.string().required("Enter your Email"),
  password: Yup.string().required("Enter your Password"),
  phone: Yup.string().required("Enter your Phone Number"),
  country: Yup.string().required("Select your Country"),
  currency: Yup.string().required("Select your Currency"),
});

// shopCreateValidation
export const shopCreateValidation = Yup.object({
  name: Yup.string().required("Field is required"),
});

// paymentCardValidation
export const paymentCardValidation = Yup.object({
  card_number: Yup.string().required("Field is required"),
  card_cvv: Yup.string().required("Field is required"),
  card_expiry: Yup.string().required("Field is required"),
});

// bankWithdrawValidation
export const bankWithdrawValidation = Yup.object({
  amount: Yup.string().required("Field is required"),
  beneficiary_name: Yup.string().required("Field is required"),
  beneficiary_iban: Yup.string().required("Field is required"),
  beneficiary_swift: Yup.string().required("Field is required"),
  beneficiary_bank_name: Yup.string().required("Field is required"),
  beneficiary_bank_address: Yup.string().required("Field is required"),
  beneficiary_bank_country: Yup.string().required("Field is required"),
});

// ineracWithdrawValidation
export const ineracWithdrawValidation = Yup.object({
  amount: Yup.string().required("Field is required"),
  phone: Yup.string().required("Field is required"),
  email: Yup.string().required("Field is required"),
});

// usdWithdrawValidation
export const usdWithdrawValidation = Yup.object({
  amount: Yup.string().required("Field is required"),
  crypto_currency: Yup.string().required("Field is required"),
  crypto_address: Yup.string().required("Field is required"),
});

// ContactValidation
export const ContactValidation = Yup.object({
  name: Yup.string().required("Enter your name"),
  phone: Yup.string().required("Enter your phone"),
  email: Yup.string().required("Enter your email"),
});
