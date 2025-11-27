import React from 'react';
import { translations } from './translations';

const StepIndicator = ({ currentStep, totalSteps, progressPercentage, isFormComplete, language }) => {
  const t = translations[language];
  
  const steps = [
    { number: 1, title: t.stepIndicator.background },
    { number: 2, title: t.stepIndicator.medicalHistory },
    { number: 3, title: t.stepIndicator.symptoms },
    { number: 4, title: t.stepIndicator.familyHistory }
  ];

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{t.formTitle}</h1>
        <div className="flex items-center space-x-2">
          {isFormComplete && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              ✓ {language === 'hi' ? 'पूर्ण' : 'Complete'}
            </span>
          )}
          <span className="text-sm font-medium text-gray-600">
            {language === 'hi' ? 'चरण' : 'Step'} {currentStep} {language === 'hi' ? 'का' : 'of'} {totalSteps}
          </span>
        </div>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div 
          className={`h-2 rounded-full transition-all duration-300 ${
            isFormComplete ? 'bg-green-600' : 'bg-blue-600'
          }`}
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      <div className="flex justify-between items-center">
        {steps.map((step) => (
          <div key={step.number} className="flex flex-col items-center flex-1">
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold mb-2 transition-all duration-300 ${
                step.number === currentStep 
                  ? 'bg-blue-600 shadow-md scale-110' 
                  : step.number < currentStep 
                  ? 'bg-green-500' 
                  : 'bg-gray-300'
              }`}
            >
              {step.number < currentStep ? '✓' : step.number}
            </div>
            <span className={`text-xs text-center ${step.number === currentStep ? 'font-semibold text-blue-600' : 'text-gray-600'}`}>
              {step.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;