import React, { useState } from 'react';

const EssentialCaseForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const [formData, setFormData] = useState({
    // Essential Personal Information
    timeline: '',
    childhood: '',
    hobbies: '',
    stressFactors: {
      family: false,
      professional: false,
      personal: false,
      anyOther: false,
    },
    
    // Essential Illness History
    majorIllnesses: '',
    surgicalHistory: '',
    currentMedications: '',
    
    // Essential Symptoms
    mainSymptoms: '',
    symptomLocation: '',
    symptomDuration: '',
    symptomsBetter: '',
    symptomsWorse: '',
    dailyBasis: '',
    
    // Essential Family History
    familyHealthSummary: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (section, field) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: !prev[section][field]
      }
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Essential Form Data:', formData);
    alert('Form submitted successfully! Check console for data.');
  };

  const progressPercentage = (currentStep / totalSteps) * 100;

  const steps = [
    { number: 1, title: 'Background' },
    { number: 2, title: 'Medical History' },
    { number: 3, title: 'Symptoms' },
    { number: 4, title: 'Family History' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Case Form</h1>
            <span className="text-sm font-medium text-gray-600">Step {currentStep} of {totalSteps}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>

          {/* Step Indicators */}
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

        <div className="bg-white shadow-lg rounded-lg p-6 md:p-8">
          <form onSubmit={handleSubmit}>
            
            {/* Step 1: Personal Background */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-3">Personal Background</h2>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Brief timeline of significant life events *
                  </label>
                  <textarea
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleInputChange}
                    rows="3"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Include major life events, traumas, or significant changes"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Describe your childhood *
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer transition">
                      <input
                        type="radio"
                        name="childhood"
                        value="pleasant"
                        checked={formData.childhood === 'pleasant'}
                        onChange={handleInputChange}
                        required
                        className="form-radio text-blue-600 w-4 h-4"
                      />
                      <span className="ml-3 text-sm text-gray-700">Pleasant</span>
                    </label>
                    <label className="flex items-center p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer transition">
                      <input
                        type="radio"
                        name="childhood"
                        value="challenging"
                        checked={formData.childhood === 'challenging'}
                        onChange={handleInputChange}
                        className="form-radio text-blue-600 w-4 h-4"
                      />
                      <span className="ml-3 text-sm text-gray-700">Challenging</span>
                    </label>
                    <label className="flex items-center p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer transition">
                      <input
                        type="radio"
                        name="childhood"
                        value="traumatic"
                        checked={formData.childhood === 'traumatic'}
                        onChange={handleInputChange}
                        className="form-radio text-blue-600 w-4 h-4"
                      />
                      <span className="ml-3 text-sm text-gray-700">Traumatic</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Hobbies & Interests
                  </label>
                  <input
                    type="text"
                    name="hobbies"
                    value={formData.hobbies}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Activities you enjoy"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Current Stress Factors *
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.keys(formData.stressFactors).map((key) => (
                      <label key={key} className="flex items-center p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer transition">
                        <input
                          type="checkbox"
                          checked={formData.stressFactors[key]}
                          onChange={() => handleCheckboxChange('stressFactors', key)}
                          className="form-checkbox text-blue-600 rounded w-4 h-4"
                        />
                        <span className="ml-3 text-sm text-gray-700 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Medical History */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-3">Medical History</h2>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Major Illnesses & Diagnoses *
                  </label>
                  <textarea
                    name="majorIllnesses"
                    value={formData.majorIllnesses}
                    onChange={handleInputChange}
                    rows="3"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="List any chronic conditions, serious illnesses, or diagnoses (include approximate ages)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Surgical History
                  </label>
                  <textarea
                    name="surgicalHistory"
                    value={formData.surgicalHistory}
                    onChange={handleInputChange}
                    rows="2"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="List any surgeries and approximate dates"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Current Medications & Supplements
                  </label>
                  <textarea
                    name="currentMedications"
                    value={formData.currentMedications}
                    onChange={handleInputChange}
                    rows="2"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="List all current medications, supplements, and dosages"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Current Symptoms */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-3">Current Symptoms</h2>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Main Symptoms/Complaints *
                  </label>
                  <textarea
                    name="mainSymptoms"
                    value={formData.mainSymptoms}
                    onChange={handleInputChange}
                    rows="3"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Describe your primary concerns and symptoms"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Location *
                    </label>
                    <input
                      type="text"
                      name="symptomLocation"
                      value={formData.symptomLocation}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                      placeholder="Where do you feel it?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Duration *
                    </label>
                    <input
                      type="text"
                      name="symptomDuration"
                      value={formData.symptomDuration}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                      placeholder="How long have you had this?"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    What makes symptoms better?
                  </label>
                  <input
                    type="text"
                    name="symptomsBetter"
                    value={formData.symptomsBetter}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Heat, cold, rest, movement, time of day, etc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    What makes symptoms worse?
                  </label>
                  <input
                    type="text"
                    name="symptomsWorse"
                    value={formData.symptomsWorse}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Activities, weather, stress, etc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Do you experience symptoms daily? *
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer transition">
                      <input
                        type="radio"
                        name="dailyBasis"
                        value="yes"
                        checked={formData.dailyBasis === 'yes'}
                        onChange={handleInputChange}
                        required
                        className="form-radio text-blue-600 w-4 h-4"
                      />
                      <span className="ml-3 text-sm text-gray-700">Yes</span>
                    </label>
                    <label className="flex items-center p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer transition">
                      <input
                        type="radio"
                        name="dailyBasis"
                        value="no"
                        checked={formData.dailyBasis === 'no'}
                        onChange={handleInputChange}
                        className="form-radio text-blue-600 w-4 h-4"
                      />
                      <span className="ml-3 text-sm text-gray-700">No</span>
                    </label>
                    <label className="flex items-center p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer transition">
                      <input
                        type="radio"
                        name="dailyBasis"
                        value="intermittent"
                        checked={formData.dailyBasis === 'intermittent'}
                        onChange={handleInputChange}
                        className="form-radio text-blue-600 w-4 h-4"
                      />
                      <span className="ml-3 text-sm text-gray-700">Intermittent</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Family Health History */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-3">Family Health History</h2>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Significant family health issues *
                  </label>
                  <textarea
                    name="familyHealthSummary"
                    value={formData.familyHealthSummary}
                    onChange={handleInputChange}
                    rows="3"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="List major health conditions in immediate family members (parents, siblings, grandparents)"
                  />
                </div>
              </div>
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
                ← Previous
              </button>

              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition"
                >
                  Next →
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-md transition"
                >
                  Submit Form ✓
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Footer Info */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Your information is confidential and secure.</p>
        </div>
      </div>
    </div>
  );
};

export default EssentialCaseForm;