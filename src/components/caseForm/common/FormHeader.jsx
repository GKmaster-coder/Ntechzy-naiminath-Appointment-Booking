import React from "react";
import { translations } from "../constants/translations";
import { TOTAL_STEPS, STEP_TITLES } from "../constants/formConfig";

const FormHeader = ({ currentStep, progressPercentage, isEditing, error }) => {
  const steps = Array.from({ length: TOTAL_STEPS }, (_, i) => ({
    number: i + 1,
    title: translations[STEP_TITLES[i + 1]] || `Step ${i + 1}`,
  }));

  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 sm:mb-4 space-y-2 sm:space-y-0">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 text-center sm:text-left">
          {isEditing ? translations.editCaseForm : translations.caseForm}
        </h1>
        <span className="text-xs sm:text-sm font-medium text-gray-600 bg-white px-3 py-1 rounded-full border self-center">
          {translations.step} {currentStep} {translations.of} {TOTAL_STEPS}
        </span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2 mb-4 sm:mb-6">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      <div className="flex justify-between items-center overflow-x-auto pb-2 -mx-2 px-2">
        {steps.map((step) => (
          <div
            key={step.number}
            className="flex flex-col items-center shrink-0 px-1 sm:px-2"
          >
            <div
              className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white font-semibold mb-1 sm:mb-2 text-xs sm:text-sm transition-all duration-300 ${
                step.number === currentStep
                  ? "bg-blue-600 shadow-md scale-110"
                  : step.number < currentStep
                  ? "bg-green-500"
                  : "bg-gray-300"
              }`}
            >
              {step.number < currentStep ? "✓" : step.number}
            </div>
            <span
              className={`text-xs text-center max-w-16 sm:max-w-none ${
                step.number === currentStep
                  ? "font-semibold text-blue-600"
                  : "text-gray-600"
              }`}
            >
              {step.title?.split(" / ")[0] || step.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormHeader;
