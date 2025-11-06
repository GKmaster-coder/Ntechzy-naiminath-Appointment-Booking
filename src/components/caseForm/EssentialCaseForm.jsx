import React, { useState } from "react";

const EssentialCaseForm = ({ onFormComplete, onFormSubmit, isFormComplete: externalIsFormComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isFormComplete, setIsFormComplete] = useState(externalIsFormComplete || false);
  const [isEditing, setIsEditing] = useState(false);
  const totalSteps = 4;

  // Bilingual text configuration
  const translations = {
    // Navigation & Structure
    caseForm: 'Case Form / केस फॉर्म',
    editCaseForm: 'Edit Essential Case Form / आवश्यक केस फॉर्म संपादित करें',
    step: 'Step / चरण',
    of: 'of / का',
    
    // Step Titles
    background: 'Background / पृष्ठभूमि',
    medicalHistory: 'Medical History / चिकित्सा इतिहास',
    symptoms: 'Symptoms / लक्षण',
    familyHistory: 'Family History / पारिवारिक इतिहास',
    
    // Personal Background Section
    personalBackground: 'Personal Background / व्यक्तिगत पृष्ठभूमि',
    timelineLabel: 'Brief timeline of significant life events / महत्वपूर्ण जीवन घटनाओं की संक्षिप्त समयरेखा',
    timelinePlaceholder: 'Include major life events, traumas, or significant changes / प्रमुख जीवन की घटनाएं, आघात, या महत्वपूर्ण परिवर्तन शामिल करें',
    childhoodLabel: 'Describe your childhood / अपने बचपन का वर्णन करें',
    pleasant: 'Pleasant / सुखद',
    challenging: 'Challenging / चुनौतीपूर्ण',
    traumatic: 'Traumatic / दर्दनाक',
    hobbiesLabel: 'Hobbies & Interests / शौक और रुचियाँ',
    hobbiesPlaceholder: 'Activities you enjoy / आपको जो गतिविधियाँ पसंद हैं',
    stressFactorsLabel: 'Current Stress Factors / वर्तमान तनाव कारक',
    family: 'Family / परिवार',
    professional: 'Professional / पेशेवर',
    personal: 'Personal / व्यक्तिगत',
    anyOther: 'Any Other / कोई अन्य',
    
    // Medical History Section
    majorIllnessesLabel: 'Major Illnesses & Diagnoses / प्रमुख बीमारियाँ और निदान',
    majorIllnessesPlaceholder: 'List any chronic conditions, serious illnesses, or diagnoses (include approximate ages) / किसी भी पुरानी स्थितियों, गंभीर बीमारियों, या निदानों की सूची बनाएं (अनुमानित आयु शामिल करें)',
    surgicalHistoryLabel: 'Surgical History / शल्य चिकित्सा इतिहास',
    surgicalHistoryPlaceholder: 'List any surgeries and approximate dates / किसी भी सर्जरी और अनुमानित तिथियों की सूची बनाएं',
    currentMedicationsLabel: 'Current Medications & Supplements / वर्तमान दवाएं और सप्लीमेंट्स',
    currentMedicationsPlaceholder: 'List all current medications, supplements, and dosages / सभी वर्तमान दवाओं, सप्लीमेंट्स और खुराक की सूची बनाएं',
    
    // Symptoms Section
    mainSymptomsLabel: 'Main Symptoms/Complaints / मुख्य लक्षण/शिकायतें',
    mainSymptomsPlaceholder: 'Describe your primary concerns and symptoms / अपनी प्राथमिक चिंताओं और लक्षणों का वर्णन करें',
    locationLabel: 'Location / स्थान',
    locationPlaceholder: 'Where do you feel it? / आप इसे कहाँ महसूस करते हैं?',
    durationLabel: 'Duration / अवधि',
    durationPlaceholder: 'How long have you had this? / आपको यह कब से है?',
    symptomsBetterLabel: 'What makes symptoms better? / लक्षणों को क्या बेहतर बनाता है?',
    symptomsBetterPlaceholder: 'Heat, cold, rest, movement, time of day, etc. / गर्मी, ठंड, आराम, गति, दिन का समय, आदि',
    symptomsWorseLabel: 'What makes symptoms worse? / लक्षणों को क्या बदतर बनाता है?',
    symptomsWorsePlaceholder: 'Activities, weather, stress, etc. / गतिविधियाँ, मौसम, तनाव, आदि',
    dailyBasisLabel: 'Do you experience symptoms daily? / क्या आप रोजाना लक्षणों का अनुभव करते हैं?',
    yes: 'Yes / हाँ',
    no: 'No / नहीं',
    intermittent: 'Intermittent / रुक-रुक कर',
    
    // Family History Section
    familyHealthLabel: 'Significant family health issues / महत्वपूर्ण पारिवारिक स्वास्थ्य समस्याएं',
    familyHealthPlaceholder: 'List major health conditions in immediate family members (parents, siblings, grandparents) / तत्काल परिवार के सदस्यों (माता-पिता, भाई-बहन, दादा-दादी) में प्रमुख स्वास्थ्य स्थितियों की सूची बनाएं',
    
    // Buttons & Actions
    previous: '← Previous / पिछला',
    next: 'Next → / अगला',
    submitForm: 'Submit Form ✓ / फॉर्म सबमिट करें ✓',
    updateForm: 'Update Form ✓ / फॉर्म अपडेट करें ✓',
    saveChanges: 'Save Changes / परिवर्तन सहेजें',
    editForm: 'Edit Form / फॉर्म संपादित करें',
    closeForm: 'Close Form / फॉर्म बंद करें',
    
    // Messages
    formCompleted: 'Case Form Completed! / केस फॉर्म पूरा हो गया!',
    formSubmitted: 'Your essential case form has been successfully submitted. You can now proceed to payment. / आपका आवश्यक केस फॉर्म सफलतापूर्वक सबमिट हो गया है। अब आप भुगतान के लिए आगे बढ़ सकते हैं।',
    confidential: 'Your information is confidential and secure. / आपकी जानकारी गोपनीय और सुरक्षित है।',
    formComplete: '✓ Form is complete. You can proceed to payment. / ✓ फॉर्म पूरा हो गया है। आप भुगतान के लिए आगे बढ़ सकते हैं।'
  };

  const [formData, setFormData] = useState({
    // Essential Personal Information
    timeline: "",
    childhood: "",
    hobbies: "",
    stressFactors: {
      family: false,
      professional: false,
      personal: false,
      anyOther: false,
    },

    // Essential Illness History
    majorIllnesses: "",
    surgicalHistory: "",
    currentMedications: "",

    // Essential Symptoms
    mainSymptoms: "",
    symptomLocation: "",
    symptomDuration: "",
    symptomsBetter: "",
    symptomsWorse: "",
    dailyBasis: "",

    // Essential Family History
    familyHealthSummary: "",
  });

  // Check if form is complete
  const checkFormCompletion = () => {
    const requiredFields = [
      formData.timeline,
      formData.childhood,
      formData.majorIllnesses,
      formData.mainSymptoms,
      formData.symptomLocation,
      formData.symptomDuration,
      formData.dailyBasis,
      formData.familyHealthSummary,
    ];

    const isComplete = requiredFields.every(field => field && field.trim() !== '');
    
    if (isComplete !== isFormComplete) {
      setIsFormComplete(isComplete);
      if (onFormComplete) {
        onFormComplete(isComplete);
      }
    }
    
    return isComplete;
  };

  useEffect(() => {
    checkFormCompletion();
  }, [formData]);

  useEffect(() => {
    if (externalIsFormComplete !== undefined) {
      setIsFormComplete(externalIsFormComplete);
    }
  }, [externalIsFormComplete]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (section, field) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: !prev[section][field],
      },
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Essential Form Data:", formData);
    alert("Form submitted successfully! Check console for data.");
  };

  const progressPercentage = (currentStep / totalSteps) * 100;

  const steps = [
    { number: 1, title: "Background" },
    { number: 2, title: "Medical History" },
    { number: 3, title: "Symptoms" },
    { number: 4, title: "Family History" },
  ];

  // If form is complete and not in edit mode, show completion message
  if (isFormComplete && !isEditing) {
    return (
      <div className="min-h-screen bg-gray-50 py-4 px-3 sm:px-4 lg:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">{translations.formCompleted}</h2>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
              {translations.formSubmitted}
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={handleEditForm}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition text-sm sm:text-base"
              >
                {translations.editForm}
              </button>
              <button
                onClick={() => {
                  if (onFormSubmit) {
                    onFormSubmit(formData);
                  }
                }}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md transition text-sm sm:text-base"
              >
                {translations.closeForm}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-3 sm:px-4 lg:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Case Form
            </h1>
            <span className="text-sm font-medium text-gray-600">
              Step {currentStep} of {totalSteps}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>

          {/* Step Indicators - Mobile Optimized */}
          <div className="flex justify-between items-center overflow-x-auto pb-2 -mx-2 px-2">
            {steps.map((step) => (
              <div
                key={step.number}
                className="flex flex-col items-center flex-1"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold mb-2 transition-all duration-300 ${
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
                  className={`text-xs text-center ${
                    step.number === currentStep
                      ? "font-semibold text-blue-600"
                      : "text-gray-600"
                  }`}
                >
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6 md:p-8">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Personal Background */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-3">
                  Personal Background
                </h2>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {translations.timelineLabel} *
                  </label>
                  <textarea
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleInputChange}
                    rows="3"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm sm:text-base"
                    placeholder={translations.timelinePlaceholder}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    {translations.childhoodLabel} *
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center p-2 sm:p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer transition text-sm">
                      <input
                        type="radio"
                        name="childhood"
                        value="pleasant"
                        checked={formData.childhood === "pleasant"}
                        onChange={handleInputChange}
                        required
                        className="form-radio text-blue-600 w-4 h-4"
                      />
                      <span className="ml-3 text-sm text-gray-700">
                        Pleasant
                      </span>
                    </label>
                    <label className="flex items-center p-2 sm:p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer transition text-sm">
                      <input
                        type="radio"
                        name="childhood"
                        value="challenging"
                        checked={formData.childhood === "challenging"}
                        onChange={handleInputChange}
                        className="form-radio text-blue-600 w-4 h-4"
                      />
                      <span className="ml-3 text-sm text-gray-700">
                        Challenging
                      </span>
                    </label>
                    <label className="flex items-center p-2 sm:p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer transition text-sm">
                      <input
                        type="radio"
                        name="childhood"
                        value="traumatic"
                        checked={formData.childhood === "traumatic"}
                        onChange={handleInputChange}
                        className="form-radio text-blue-600 w-4 h-4"
                      />
                      <span className="ml-3 text-sm text-gray-700">
                        Traumatic
                      </span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {translations.hobbiesLabel}
                  </label>
                  <input
                    type="text"
                    name="hobbies"
                    value={formData.hobbies}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm sm:text-base"
                    placeholder={translations.hobbiesPlaceholder}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    {translations.stressFactorsLabel} *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    {Object.keys(formData.stressFactors).map((key) => (
                      <label
                        key={key}
                        className="flex items-center p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer transition"
                      >
                        <input
                          type="checkbox"
                          checked={formData.stressFactors[key]}
                          onChange={() =>
                            handleCheckboxChange("stressFactors", key)
                          }
                          className="form-checkbox text-blue-600 rounded w-4 h-4"
                        />
                        <span className="ml-3 text-sm text-gray-700 capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}
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
                <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-3">
                  Medical History
                </h2>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {translations.majorIllnessesLabel} *
                  </label>
                  <textarea
                    name="majorIllnesses"
                    value={formData.majorIllnesses}
                    onChange={handleInputChange}
                    rows="3"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm sm:text-base"
                    placeholder={translations.majorIllnessesPlaceholder}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {translations.surgicalHistoryLabel}
                  </label>
                  <textarea
                    name="surgicalHistory"
                    value={formData.surgicalHistory}
                    onChange={handleInputChange}
                    rows="2"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm sm:text-base"
                    placeholder={translations.surgicalHistoryPlaceholder}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {translations.currentMedicationsLabel}
                  </label>
                  <textarea
                    name="currentMedications"
                    value={formData.currentMedications}
                    onChange={handleInputChange}
                    rows="2"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm sm:text-base"
                    placeholder={translations.currentMedicationsPlaceholder}
                  />
                </div>
              </div>
            )}

            {/* Step 3: Current Symptoms */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-3">
                  Current Symptoms
                </h2>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {translations.mainSymptomsLabel} *
                  </label>
                  <textarea
                    name="mainSymptoms"
                    value={formData.mainSymptoms}
                    onChange={handleInputChange}
                    rows="3"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm sm:text-base"
                    placeholder={translations.mainSymptomsPlaceholder}
                  />
                </div>

                <div className="grid grid-cols-1 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {translations.locationLabel} *
                    </label>
                    <input
                      type="text"
                      name="symptomLocation"
                      value={formData.symptomLocation}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm sm:text-base"
                      placeholder={translations.locationPlaceholder}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {translations.durationLabel} *
                    </label>
                    <input
                      type="text"
                      name="symptomDuration"
                      value={formData.symptomDuration}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm sm:text-base"
                      placeholder={translations.durationPlaceholder}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {translations.symptomsBetterLabel}
                  </label>
                  <input
                    type="text"
                    name="symptomsBetter"
                    value={formData.symptomsBetter}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm sm:text-base"
                    placeholder={translations.symptomsBetterPlaceholder}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {translations.symptomsWorseLabel}
                  </label>
                  <input
                    type="text"
                    name="symptomsWorse"
                    value={formData.symptomsWorse}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm sm:text-base"
                    placeholder={translations.symptomsWorsePlaceholder}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    {translations.dailyBasisLabel} *
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center p-2 sm:p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer transition text-sm">
                      <input
                        type="radio"
                        name="dailyBasis"
                        value="yes"
                        checked={formData.dailyBasis === "yes"}
                        onChange={handleInputChange}
                        required
                        className="form-radio text-blue-600 w-4 h-4"
                      />
                      <span className="ml-2 sm:ml-3 text-gray-700">{translations.yes}</span>
                    </label>
                    <label className="flex items-center p-2 sm:p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer transition text-sm">
                      <input
                        type="radio"
                        name="dailyBasis"
                        value="no"
                        checked={formData.dailyBasis === "no"}
                        onChange={handleInputChange}
                        className="form-radio text-blue-600 w-4 h-4"
                      />
                      <span className="ml-2 sm:ml-3 text-gray-700">{translations.no}</span>
                    </label>
                    <label className="flex items-center p-2 sm:p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer transition text-sm">
                      <input
                        type="radio"
                        name="dailyBasis"
                        value="intermittent"
                        checked={formData.dailyBasis === "intermittent"}
                        onChange={handleInputChange}
                        className="form-radio text-blue-600 w-4 h-4"
                      />
                      <span className="ml-3 text-sm text-gray-700">
                        Intermittent
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Family Health History */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-3">
                  Family Health History
                </h2>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {translations.familyHealthLabel} *
                  </label>
                  <textarea
                    name="familyHealthSummary"
                    value={formData.familyHealthSummary}
                    onChange={handleInputChange}
                    rows="3"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm sm:text-base"
                    placeholder={translations.familyHealthPlaceholder}
                  />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex flex-col-reverse sm:flex-row justify-between mt-6 sm:mt-8 pt-4 sm:pt-6 border-t space-y-3 sm:space-y-0 space-y-reverse">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-md font-semibold transition text-sm sm:text-base ${
                  currentStep === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-gray-600 hover:bg-gray-700 text-white"
                }`}
              >
                {translations.previous}
              </button>

              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition text-sm sm:text-base"
                >
                  {translations.next}
                </button>
              ) : (
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  {isEditing && (
                    <button
                      type="button"
                      onClick={handleSaveEdit}
                      className="px-4 sm:px-6 py-2 sm:py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md transition text-sm sm:text-base"
                    >
                      {translations.saveChanges}
                    </button>
                  )}
                  <button
                    type="submit"
                    className="px-4 sm:px-8 py-2 sm:py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-md transition text-sm sm:text-base"
                  >
                    {isEditing ? translations.updateForm : translations.submitForm}
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Footer Info */}
        <div className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-gray-600">
          <p>{translations.confidential}</p>
          {isFormComplete && (
            <p className="text-green-600 font-semibold mt-2">
              {translations.formComplete}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EssentialCaseForm;
