// StepOne.js

export const StepOne = ({ formik, handleNext, isLoading }) => {
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <button type="button" onClick={handleNext} disabled={isLoading}>
          Next
        </button>
      </form>
    </>
  );
};

// StepTwo.js

export const StepTwo = ({ formik, handleBack, handleSubmit, isLoading }) => {
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        {/* Your Step Two Form Fields */}
        <button type="button" onClick={handleBack} disabled={isLoading}>
          Back
        </button>
        <button type="submit" disabled={isLoading}>
          Submit
        </button>
      </form>
    </>
  );
};
