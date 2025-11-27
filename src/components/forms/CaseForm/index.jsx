import React from "react";
import { useCaseForm } from "./hooks/useCaseForm";
import { translations } from "./config/translations";
import FormHeader from "./components/FormHeader";
import FormNavigation from "./components/FormNavigation";
import FormSuccess from "./components/FormSuccess";
import Step1LifeEvents from "./steps/Step1LifeEvents";
import Step2EarlyDevelopment from "./steps/Step2EarlyDevelopment";
import Step3IllnessHistory from "./steps/Step3IllnessHistory";
import Step4RecurringIssues from "./steps/Step4RecurringIssues";
import Step5Symptoms from "./steps/Step5Symptoms";
import Step6FamilyHistory from "./steps/Step6FamilyHistory";

const CaseForm = ({
  onFormComplete,
  onFormSubmit,
  isFormComplete: externalIsFormComplete,
}) => {
  const {
    currentStep,
    isFormComplete,
    isEditing,
    submitted,
    errors,
    formData,
    isLoading,
    error,
    isCurrentStepValid,
    isAllValid,
    progressPercentage,
    handleInputChange,
    handleNestedInputChange,
    handleCheckboxChange,
    handleFamilyHealthChange,
    handleSubmit,
    handleEditForm,
    handleSaveEdit,
    nextStep,
    prevStep,
  } = useCaseForm({
    onFormComplete,
    onFormSubmit,
    isFormComplete: externalIsFormComplete,
  });

  if (submitted && isFormComplete && !isEditing) {
    return <FormSuccess onEditForm={handleEditForm} />;
  }

  const renderCurrentStep = () => {
    const stepProps = {
      formData,
      errors,
      onInputChange: handleInputChange,
      onNestedInputChange: handleNestedInputChange,
      onCheckboxChange: handleCheckboxChange,
      onFamilyHealthChange: handleFamilyHealthChange,
    };

    switch (currentStep) {
      case 1:
        return <Step1LifeEvents {...stepProps} />;
      case 2:
        return <Step2EarlyDevelopment {...stepProps} />;
      case 3:
        return <Step3IllnessHistory {...stepProps} />;
      case 4:
        return <Step4RecurringIssues {...stepProps} />;
      case 5:
        return <Step5Symptoms {...stepProps} />;
      case 6:
        return <Step6FamilyHistory {...stepProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-3 sm:px-4 lg:px-6">
      <div className="max-w-5xl mx-auto">
        <FormHeader
          currentStep={currentStep}
          progressPercentage={progressPercentage}
          isEditing={isEditing}
          error={error}
        />

        <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6 md:p-8">
          <form onSubmit={handleSubmit}>
            {renderCurrentStep()}
            <FormNavigation
              currentStep={currentStep}
              isCurrentStepValid={isCurrentStepValid}
              isAllValid={isAllValid}
              isLoading={isLoading}
              isEditing={isEditing}
              onPrevStep={prevStep}
              onNextStep={nextStep}
              onSaveEdit={handleSaveEdit}
              onSubmit={handleSubmit}
            />
          </form>
        </div>

        <div className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-gray-600">
          <p>{translations.confidential}</p>
          {isFormComplete && !submitted && (
            <p className="text-green-600 font-semibold mt-2">
              {translations.formComplete}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaseForm;
