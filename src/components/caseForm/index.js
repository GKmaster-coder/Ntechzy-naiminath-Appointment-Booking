// Main export
export { default as CaseForm } from "./CompleteCaseFormOptimized";

// Step components
export { default as Step1LifeEvents } from "./steps/Step1LifeEvents";
export { default as Step2EarlyDevelopment } from "./steps/Step2EarlyDevelopment";
export { default as Step3IllnessHistory } from "./steps/Step3IllnessHistory";
export { default as Step4RecurringIssues } from "./steps/Step4RecurringIssues";
export { default as Step5Symptoms } from "./steps/Step5Symptoms";
export { default as Step6FamilyHistory } from "./steps/Step6FamilyHistory";

// Common components
export { default as FormHeader } from "./common/FormHeader";
export { default as FormNavigation } from "./common/FormNavigation";
export { default as FormSuccess } from "./common/FormSuccess";

// Hooks
export { useCaseForm } from "./hooks/useCaseForm";

// Constants
export { translations } from "./constants/translations";
export * from "./constants/formConfig";

// Utils
export * from "./utils/formValidation";
export * from "./utils/dataTransform";
