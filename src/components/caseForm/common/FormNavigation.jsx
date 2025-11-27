import React from "react";
import { translations } from "../constants/translations";
import { TOTAL_STEPS } from "../constants/formConfig";

const FormNavigation = ({
  currentStep,
  isCurrentStepValid,
  isAllValid,
  isLoading,
  isEditing,
  onPrevStep,
  onNextStep,
  onSaveEdit,
  onSubmit,
}) => {
  return (
    <div className="flex flex-col-reverse sm:flex-row justify-between mt-6 sm:mt-8 pt-4 sm:pt-6 border-t space-y-3 sm:space-y-0 space-y-reverse">
      <button
        type="button"
        onClick={onPrevStep}
        disabled={currentStep === 1 || isLoading}
        className={`px-4 sm:px-6 py-2 sm:py-3 rounded-md font-semibold transition text-sm sm:text-base ${
          currentStep === 1 || isLoading
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-gray-600 hover:bg-gray-700 text-white"
        }`}
      >
        {translations.previous}
      </button>

      {currentStep < TOTAL_STEPS ? (
        <button
          type="button"
          onClick={onNextStep}
          disabled={!isCurrentStepValid || isLoading}
          className={`px-4 sm:px-6 py-2 sm:py-3 rounded-md text-sm sm:text-base font-semibold transition ${
            isCurrentStepValid && !isLoading
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          {translations.next}
        </button>
      ) : (
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          {isEditing && (
            <button
              type="button"
              onClick={onSaveEdit}
              disabled={isLoading}
              className={`px-4 sm:px-6 py-2 sm:py-3 font-semibold rounded-md transition text-sm sm:text-base ${
                isLoading
                  ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              {isLoading
                ? translations.submittingForm
                : translations.saveChanges}
            </button>
          )}
          <button
            type="submit"
            onClick={onSubmit}
            disabled={!isAllValid || isLoading}
            className={`px-4 sm:px-8 py-2 sm:py-3 font-bold rounded-md transition text-sm sm:text-base ${
              !isAllValid || isLoading
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            {isLoading
              ? translations.submittingForm
              : isEditing
              ? translations.updateForm
              : translations.submitForm}
          </button>
        </div>
      )}
    </div>
  );
};

export default FormNavigation;
