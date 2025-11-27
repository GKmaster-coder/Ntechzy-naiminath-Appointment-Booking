import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import StepIndicator from './StepIndicator';
import Step1Background from './steps/Step1Background';
import Step2MedicalHistory from './steps/Step2MedicalHistory';
import Step3Symptoms from './steps/Step3Symptoms';
import Step4FamilyHistory from './steps/Step4FamilyHistory';
import { initialValues } from './initialValues';
import { validationSchemas } from './validationSchemas';
import { translations } from './translations';

const OfflineCaseForm = ({ onFormComplete, onFormSubmit, isFormComplete: externalFormComplete, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const [isSaved, setIsSaved] = useState(false);
  const [internalFormComplete, setInternalFormComplete] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [language, setLanguage] = useState('en'); // 'en' or 'hi'

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchemas[currentStep - 1],
    onSubmit: async (values) => {
      console.log('Essential Form Data:', values);
      
      // Show success message
      setShowSuccessMessage(true);
      
      // Mark form as complete
      setInternalFormComplete(true);
      
      // Notify parent component about form submission
      if (onFormSubmit) {
        onFormSubmit(values);
      }
      
      // Notify parent component about form completion
      if (onFormComplete) {
        onFormComplete(true);
      }
      
      // Auto close after 3 seconds
      setTimeout(() => {
        if (onClose) {
          onClose();
        }
      }, 3000);
    },
  });

  // Check if form is completely filled and valid
  const checkFormCompletion = async () => {
    try {
      // Only validate step 4 as compulsory
      await validationSchemas[3].validate(formik.values, { abortEarly: false });
      setInternalFormComplete(true);
      if (onFormComplete) {
        onFormComplete(true);
      }
    } catch (error) {
      setInternalFormComplete(false);
      if (onFormComplete) {
        onFormComplete(false);
      }
    }
  };

  // Check form completion when values change
  useEffect(() => {
    checkFormCompletion();
  }, [formik.values]);

  const nextStep = async () => {
    // Allow moving to next step without validation for steps 1-3
    // Only validate current step if it's step 4
    if (currentStep === 4) {
      try {
        await validationSchemas[3].validate(formik.values, { abortEarly: false });
      } catch (errors) {
        console.log('Validation errors:', errors);
        return; // Don't proceed if step 4 validation fails
      }
    }
    
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsSaved(false);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsSaved(false);
    }
  };

  const handleSaveProgress = () => {
    const formData = {
      ...formik.values,
      lastSaved: new Date().toISOString(),
      currentStep: currentStep,
      language: language
    };
    
    localStorage.setItem('essentialCaseFormData', JSON.stringify(formData));
    setIsSaved(true);
    
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleLoadProgress = () => {
    const savedData = localStorage.getItem('essentialCaseFormData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      formik.setValues(parsedData);
      setCurrentStep(parsedData.currentStep || 1);
      setLanguage(parsedData.language || 'en');
      alert('Previous progress loaded successfully!');
    } else {
      alert('No saved progress found.');
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  const progressPercentage = (currentStep / totalSteps) * 100;
  const t = translations[language];
  const isFormComplete = externalFormComplete !== undefined ? externalFormComplete : internalFormComplete;

  const getFieldError = (fieldName) => {
    const error = formik.errors[fieldName];
    const touched = formik.touched[fieldName];
    return touched && error ? error : null;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Success Message */}
        {showSuccessMessage && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">
                  {t.success.title}
                </h3>
                <p className="text-sm text-green-600 mt-1">
                  {t.success.message}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Language Toggle */}
        <div className="flex justify-between items-center mb-4">
          <button
            type="button"
            onClick={toggleLanguage}
            className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-md transition"
          >
            {language === 'en' ? 'हिंदी' : 'English'}
          </button>
        </div>

        <StepIndicator 
          currentStep={currentStep}
          totalSteps={totalSteps}
          progressPercentage={progressPercentage}
          isFormComplete={isFormComplete}
          language={language}
        />

        {/* Save Progress Button */}
        <div className="flex justify-end mb-4 space-x-3">
          <button
            type="button"
            onClick={handleLoadProgress}
            className="px-4 py-2 text-sm bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-md transition"
          >
            {t.common.loadProgress}
          </button>
          <button
            type="button"
            onClick={handleSaveProgress}
            className="px-4 py-2 text-sm bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-md transition flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
            {t.common.saveProgress}
          </button>
          {isSaved && (
            <div className="flex items-center px-3 py-2 bg-green-100 text-green-700 rounded-md text-sm">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {t.common.progressSaved}
            </div>
          )}
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 md:p-8">
          <form onSubmit={formik.handleSubmit}>
            
            {/* Step 1: Personal Background */}
            {currentStep === 1 && (
              <Step1Background 
                formik={formik}
                getFieldError={getFieldError}
                language={language}
              />
            )}

            {/* Step 2: Medical History */}
            {currentStep === 2 && (
              <Step2MedicalHistory 
                formik={formik}
                getFieldError={getFieldError}
                language={language}
              />
            )}

            {/* Step 3: Current Symptoms */}
            {currentStep === 3 && (
              <Step3Symptoms 
                formik={formik}
                getFieldError={getFieldError}
                language={language}
              />
            )}

            {/* Step 4: Family Health History */}
            {currentStep === 4 && (
              <Step4FamilyHistory 
                formik={formik}
                getFieldError={getFieldError}
                language={language}
              />
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-md font-semibold transition ${
                  currentStep === 1
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-600 hover:bg-gray-700 text-white'
                }`}
              >
                {t.common.previous}
              </button>

              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition"
                >
                  {t.common.next}
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={showSuccessMessage}
                  className={`px-8 py-3 font-bold rounded-md transition ${
                    showSuccessMessage
                      ? 'bg-green-600 text-white cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                >
                  {showSuccessMessage ? t.common.submitted : t.common.submit}
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Footer Info */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>{t.common.required}</p>
          {isFormComplete && (
            <p className="text-green-600 font-medium mt-2">
              {t.common.allFieldsComplete}
            </p>
          )}
          <p className="mt-1">{t.common.confidential}</p>
        </div>
      </div>
    </div>
  );
};

export default OfflineCaseForm;