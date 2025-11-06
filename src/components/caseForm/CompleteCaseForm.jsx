import React, { useState } from "react";

const CompleteCaseForm = ({ onFormComplete, onFormSubmit, isFormComplete: externalIsFormComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isFormComplete, setIsFormComplete] = useState(externalIsFormComplete || false);
  const [isEditing, setIsEditing] = useState(false);
  const totalSteps = 6;

  // Bilingual text configuration (same as before)
  const translations = {
    // Navigation & Structure
    caseForm: 'Case Form / केस फॉर्म',
    editCaseForm: 'Edit Case Form / केस फॉर्म संपादित करें',
    step: 'Step / चरण',
    of: 'of / का',
    
    // Step Titles
    lifeEvents: 'Life Events / जीवन की घटनाएं',
    earlyDevelopment: 'Early Development / प्रारंभिक विकास',
    illnessHistory: 'Illness History / बीमारी का इतिहास',
    recurringIssues: 'Recurring Issues / आवर्ती समस्याएं',
    symptoms: 'Symptoms / लक्षण',
    familyHistory: 'Family History / पारिवारिक इतिहास',
    
    // Common Terms
    optional: 'Optional / वैकल्पिक',
    yes: 'Yes / हाँ',
    no: 'No / नहीं',
    describe: 'Describe / वर्णन करें',
    age: 'Age / उम्र',
    severity: 'Severity / गंभीरता',
    
    // Step 1: Significant Life Events
    significantLifeEvents: 'Significant Life Events / महत्वपूर्ण जीवन घटनाएं',
    timelineLabel: 'Timeline from birth to present / जन्म से वर्तमान तक की समयरेखा',
    timelineDescription: 'Include: traumas, romantic disappointments, divorces, work/family issues, deaths, humiliations, major illnesses, onset of conditions, medications. / शामिल करें: आघात, रोमांटिक निराशाएं, तलाक, काम/परिवार के मुद्दे, मौतें, अपमान, प्रमुख बीमारियां, स्थितियों की शुरुआत, दवाएं',
    timelinePlaceholder: 'Describe your life timeline... / अपनी जीवन समयरेखा का वर्णन करें...',
    explainChildhood: 'Explain your childhood: / अपने बचपन के बारे में बताएं:',
    pleasant: 'Pleasant / सुखद',
    specificFear: 'Specific Fear during childhood / बचपन के दौरान विशिष्ट भय',
    natureLabel: 'Nature - Reaction during anger (if expressed, explain how): / स्वभाव - गुस्से के दौरान प्रतिक्रिया (यदि व्यक्त की गई है, तो बताएं कैसे):',
    throwingThings: 'Throwing things / चीजें फेंकना',
    shouting: 'Shouting / चिल्लाना',
    sittingAlone: 'Sitting alone / अकेले बैठना',
    avoidingFood: 'Avoiding food / भोजन से परहेज करना',
    abusingFighting: 'Abusing/Fighting / गाली देना/लड़ना',
    introverted: 'Introverted / अंतर्मुखी',
    likesToBeAlone: 'Likes to be alone / अकेले रहना पसंद करना',
    pleasantTime: 'Most pleasant time of life / जीवन का सबसे सुखद समय',
    strugglingTime: 'A struggling time of life / जीवन का संघर्षपूर्ण समय',
    painfulTime: 'Most painful time of life / जीवन का सबसे दर्दनाक समय',
    hobbies: 'Hobbies / शौक',
    hobbiesPlaceholder: 'Your hobbies... / आपके शौक...',
    stressFactors: 'Stress factors: / तनाव कारक:',
    family: 'Family / परिवार',
    professional: 'Professional / पेशेवर',
    personal: 'Personal / व्यक्तिगत',
    anyOther: 'Any Other / कोई अन्य',
    
    // Step 2: Early Development
    goodBaby: 'Were you a "good" baby? / क्या आप एक "अच्छे" बच्चे थे?',
    goodBabyPlaceholder: 'Describe your behavior as a baby... / बच्चे के रूप में अपने व्यवहार का वर्णन करें...',
    cryingReason: 'Or did you cry a lot? If so, why? / या क्या आप बहुत रोते थे? यदि हां, तो क्यों?',
    cryingReasonPlaceholder: 'Reason for crying... / रोने का कारण...',
    developmentAges: 'At which ages did you develop: / आपने किस उम्र में विकास किया:',
    teeth: 'Teeth / दांत',
    crawl: 'Ability to crawl / रेंगने की क्षमता',
    walk: 'Ability to walk / चलने की क्षमता',
    talk: 'Ability to talk / बोलने की क्षमता',
    standardAgeFrames: 'If you are unsure, do you know if these events occurred within the standard age frames? / यदि आप अनिश्चित हैं, तो क्या आप जानते हैं कि क्या ये घटनाएं मानक आयु सीमा के भीतर हुई थीं?',
    standardAgeFramesPlaceholder: 'Yes/No/Unsure... / हाँ/नहीं/अनिश्चित...',
    
    // Step 3: Illness History
    illnessNote: 'If affected by any illness, indicate age and severity (severe/mild/long-lasting) / यदि किसी बीमारी से प्रभावित हैं, तो उम्र और गंभीरता (गंभीर/हल्की/लंबे समय तक चलने वाली) बताएं',
    chickenPox: 'Chicken Pox / चिकन पॉक्स',
    mumps: 'Mumps / कनफेड़',
    germanMeasles: 'German Measles / जर्मन खसरा',
    pneumonia: 'Pneumonia / निमोनिया',
    measles: 'Measles / खसरा',
    scarletFever: 'Scarlet Fever / स्कार्लेट फीवर',
    mononucleosis: 'Mononucleosis / मोनोन्यूक्लियोसिस',
    whoopingCough: 'Whooping Cough / काली खांसी',
    typhoid: 'Typhoid / टाइफाइड',
    accidentInjury: 'Accident/Injury / दुर्घटना/चोट',
    dengue: 'Dengue / डेंगू',
    animalBite: 'Animal Bite / जानवर का काटना',
    malaria: 'Malaria / मलेरिया',
    surgicalHistory: 'Surgical History / सर्जिकल इतिहास',
    otherIllnesses: 'Other Illnesses / अन्य बीमारियां',
    illnessPlaceholder: 'Age and severity... / उम्र और गंभीरता...',
    
    // Step 4: Recurring Issues & Vaccinations
    recurringIssuesDesc: 'Have you suffered from recurring: / क्या आप आवर्ती से पीड़ित हैं:',
    boils: 'Boils / फोड़े',
    earInfections: 'Ear Infections / कान के संक्रमण',
    tonsillitis: 'Tonsillitis / टॉन्सिलिटिस',
    colds: 'Colds / जुकाम',
    polyps: 'Polyps / पॉलिप्स',
    tumors: 'Tumors / ट्यूमर',
    coughsChest: 'Coughs/Chest issues / खांसी/छाती की समस्याएं',
    skinDisorders: 'Skin Disorders / त्वचा विकार',
    urinaryTract: 'Urinary Tract issues / मूत्र मार्ग की समस्याएं',
    cysts: 'Cysts / सिस्ट',
    stomachBugs: 'Stomach Bugs / पेट की समस्याएं',
    warts: 'Warts / मस्से',
    yeastInfections: 'Yeast Infections / यीस्ट संक्रमण',
    vaccinationReaction: 'Have you had reactions to any vaccinations? / क्या आपको किसी टीकाकरण की प्रतिक्रिया हुई है?',
    healthDecline: 'Did your health decline after a vaccination? / क्या टीकाकरण के बाद आपका स्वास्थ्य खराब हुआ?',
    allergyInjections: 'Have you had allergy desensitization injections? / क्या आपने एलर्जी डिसेंसिटाइजेशन इंजेक्शन लिए हैं?',
    
    // Step 5: Symptoms
    symptomsPain: 'Symptoms & Pain / लक्षण और दर्द',
    symptomsDescription: 'Check all boxes that describe the symptoms/pain: / उन सभी बॉक्सों को चेक करें जो लक्षणों/दर्द का वर्णन करते हैं:',
    symptomsBetter: 'What makes the pain/symptom better? / दर्द/लक्षण को क्या बेहतर बनाता है?',
    symptomsBetterDesc: 'Heat, cold, motion, being still, menstrual cycle, sitting, lying, etc. / गर्मी, ठंड, गति, स्थिर रहना, मासिक धर्म चक्र, बैठना, लेटना, आदि',
    symptomsBetterPlaceholder: 'What helps... / क्या मदद करता है...',
    symptomsWorse: 'What makes symptoms worse? / लक्षणों को क्या बदतर बनाता है?',
    symptomsWorsePlaceholder: 'What worsens... / क्या बदतर बनाता है...',
    symptomsTimeOfDay: 'Is there a specific time of day that your symptoms are worse? / क्या दिन का कोई विशिष्ट समय है जब आपके लक्षण बदतर होते हैं?',
    symptomsTimePlaceholder: 'Time of day... / दिन का समय...',
    dailyBasis: 'Do you have pain/symptoms on a daily basis? / क्या आपको रोजाना दर्द/लक्षण होते हैं?',
    painLocation: 'Where do you feel it? (location) / आप इसे कहाँ महसूस करते हैं? (स्थान)',
    painLocationPlaceholder: 'Pain location... / दर्द का स्थान...',
    painExtends: 'Does the pain extend to another location? If so, where? / क्या दर्द किसी अन्य स्थान तक फैलता है? यदि हां, तो कहाँ?',
    painExtendsPlaceholder: 'Extension location... / विस्तार स्थान...',
    
    // Step 6: Family Health History
    familyHealthNote: 'Indicate which ailments have affected your relatives, including their ages, to the best of your ability. / बताएं कि कौन सी बीमारियों ने आपके रिश्तेदारों को प्रभावित किया है, उनकी उम्र सहित, अपनी पूरी क्षमता के अनुसार',
    relation: 'Relation / संबंध',
    ageAlive: 'Age if alive / यदि जीवित हैं तो उम्र',
    agePassing: 'Age at passing / मृत्यु के समय उम्र',
    ailments: 'Ailments / बीमारियां',
    mother: 'Mother / माँ',
    father: 'Father / पिता',
    siblings: 'Siblings / भाई-बहन',
    maternalGrandmother: 'Maternal Grandmother / नानी',
    maternalGrandfather: 'Maternal Grandfather / नाना',
    maternalAuntsUncles: 'Maternal Aunts/Uncles / मौसी/मामा',
    paternalGrandmother: 'Paternal Grandmother / दादी',
    paternalGrandfather: 'Paternal Grandfather / दादा',
    paternalAuntsUncles: 'Paternal Aunts/Uncles / चाची/चाचा',
    agePlaceholder: 'Age / उम्र',
    ailmentsPlaceholder: 'List ailments... / बीमारियों की सूची बनाएं...',
    
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
    formSubmitted: 'Your case form has been successfully submitted. You can now proceed to payment. / आपका केस फॉर्म सफलतापूर्वक सबमिट हो गया है। अब आप भुगतान के लिए आगे बढ़ सकते हैं।',
    confidential: 'Your information is confidential and secure. / आपकी जानकारी गोपनीय और सुरक्षित है।',
    formComplete: '✓ Form is complete. You can proceed to payment. / ✓ फॉर्म पूरा हो गया है। आप भुगतान के लिए आगे बढ़ सकते हैं।',
    
    // Symptom Descriptions
    aching: 'Aching / दर्द',
    drawing: 'Drawing / खिंचाव',
    pressureInwards: 'Pressure inwards / अंदर की ओर दबाव',
    biting: 'Biting / काटने जैसा',
    dull: 'Dull / सुस्त',
    pressureOutwards: 'Pressure outwards / बाहर की ओर दबाव',
    boring: 'Boring / उबाऊ',
    electric: 'Electric / बिजली जैसा',
    pulsating: 'Pulsating / स्पंदनशील',
    bruised: 'Bruised / चोटिल',
    gripping: 'Gripping / पकड़ने वाला',
    shooting: 'Shooting / चुभने वाला',
    burning: 'Burning / जलन',
    jerking: 'Jerking / झटके',
    sore: 'Sore / पीड़ादायक',
    bursting: 'Bursting / फटने वाला',
    likeACut: 'Like a cut / कटे हुए जैसा',
    stabbing: 'Stabbing / छुरा घोंपने जैसा',
    cramping: 'Cramping / ऐंठन',
    likePlugStuck: 'Like plug stuck / प्लग अटके हुए जैसा',
    stinging: 'Stinging / डंक मारने जैसा',
    crushing: 'Crushing / कुचलने वाला',
    likeRock: 'Like rock / पत्थर जैसा',
    stupefying: 'Stupefying / स्तब्ध करने वाला',
    cutting: 'Cutting / काटने वाला',
    likeSplinter: 'Like splinter / कांटे जैसा',
    tearing: 'Tearing / फाड़ने वाला',
    digging: 'Digging / खोदने वाला',
    pinching: 'Pinching / चुटकी काटने वाला',
    throbbing: 'Throbbing / धड़कने वाला'
  };


  const [formData, setFormData] = useState({
    // Significant Life Events
    timeline: "",
    childhood: "",
    specificFear: "",
    nature: {
      throwingThings: false,
      shouting: false,
      sittingAlone: false,
      avoidingFood: false,
      abusingFighting: false,
      introverted: false,
      likesToBeAlone: false,
    },
    pleasantTime: "",
    strugglingTime: "",
    painfulTime: "",
    hobbies: "",
    stressFactors: {
      family: false,
      professional: false,
      personal: false,
      anyOther: false,
    },

    // Baby Development
    goodBaby: "",
    cryingReason: "",
    developmentAges: {
      teeth: "",
      crawl: "",
      walk: "",
      talk: "",
    },
    standardAgeFrames: "",

    // Illness History
    illnessHistory: {
      chickenPox: "",
      mumps: "",
      germanMeasles: "",
      pneumonia: "",
      measles: "",
      scarletFever: "",
      mononucleosis: "",
      whoopingCough: "",
      typhoid: "",
      accidentInjury: "",
      dengue: "",
      animalBite: "",
      malaria: "",
      surgicalHistory: "",
      otherIllnesses: "",
    },

    // Recurring Issues
    recurring: {
      boils: false,
      earInfections: false,
      tonsillitis: false,
      colds: false,
      polyps: false,
      tumors: false,
      coughsChest: false,
      skinDisorders: false,
      urinaryTract: false,
      cysts: false,
      stomachBugs: false,
      warts: false,
      yeastInfections: false,
    },

    // Vaccinations
    vaccinationReaction: "",
    healthDecline: "",
    allergyInjections: "",

    // Symptoms
    symptoms: {
      aching: false,
      drawing: false,
      pressureInwards: false,
      biting: false,
      dull: false,
      pressureOutwards: false,
      boring: false,
      electric: false,
      pulsating: false,
      bruised: false,
      gripping: false,
      shooting: false,
      burning: false,
      jerking: false,
      sore: false,
      bursting: false,
      likeACut: false,
      stabbing: false,
      cramping: false,
      likePlugStuck: false,
      stinging: false,
      crushing: false,
      likeRock: false,
      stupefying: false,
      cutting: false,
      likeSplinter: false,
      tearing: false,
      digging: false,
      pinching: false,
      throbbing: false,
    },
    symptomsBetter: "",
    symptomsWorse: "",
    symptomsTimeOfDay: "",
    dailyBasis: "",
    painLocation: "",
    painExtends: "",

    // Family Health History
    familyHealth: {
      mother: { ageAlive: "", agePassing: "", ailments: "" },
      father: { ageAlive: "", agePassing: "", ailments: "" },
      siblings: { ageAlive: "", agePassing: "", ailments: "" },
      maternalGrandmother: { ageAlive: "", agePassing: "", ailments: "" },
      maternalGrandfather: { ageAlive: "", agePassing: "", ailments: "" },
      maternalAuntsUncles: { ageAlive: "", agePassing: "", ailments: "" },
      paternalGrandmother: { ageAlive: "", agePassing: "", ailments: "" },
      paternalGrandfather: { ageAlive: "", agePassing: "", ailments: "" },
      paternalAuntsUncles: { ageAlive: "", agePassing: "", ailments: "" },
    },
  });

  // Check if form is complete (same as before)
  const checkFormCompletion = () => {
    const requiredFields = [
      formData.timeline,
      formData.childhood,
      formData.goodBaby,
      formData.standardAgeFrames,
      formData.vaccinationReaction,
      formData.healthDecline,
      formData.allergyInjections,
      formData.symptomsBetter,
      formData.symptomsWorse,
      formData.dailyBasis,
      formData.painLocation,
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

  const handleNestedInputChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleFamilyHealthChange = (relation, field, value) => {
    setFormData((prev) => ({
      ...prev,
      familyHealth: {
        ...prev.familyHealth,
        [relation]: {
          ...prev.familyHealth[relation],
          [field]: value,
        },
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
    console.log("Form Data:", formData);
    alert("Form submitted successfully! Check console for data.");
  };

  const progressPercentage = (currentStep / totalSteps) * 100;

  const steps = [
    { number: 1, title: "Life Events" },
    { number: 2, title: "Early Development" },
    { number: 3, title: "Illness History" },
    { number: 4, title: "Recurring Issues" },
    { number: 5, title: "Symptoms" },
    { number: 6, title: "Family History" },
  ];

  // If form is complete and not in edit mode, show completion message
  if (isFormComplete && !isEditing) {
    return (
      <div className="min-h-screen bg-gray-50 py-4 px-3 sm:px-4 lg:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      <div className="max-w-5xl mx-auto">
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
            {/* Step 1: Significant Life Events */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-3">
                  Significant Life Events
                </h2>

                <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6 rounded">
                  <p className="text-sm text-gray-700">
                    <strong>Optional:</strong> Traumatic events can impact your
                    health. It's helpful to know the effects and how they left
                    you feeling. You can discuss details in person if preferred.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {translations.timelineLabel}
                  </label>
                  <p className="text-xs text-gray-500 mb-2">
                    Include: traumas, romantic disappointments, divorces,
                    work/family issues, deaths, humiliations, major illnesses,
                    onset of conditions, medications.
                  </p>
                  <textarea
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm sm:text-base"
                    placeholder={translations.timelinePlaceholder}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    {translations.explainChildhood}
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center p-2 sm:p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer transition text-sm">
                      <input
                        type="radio"
                        name="childhood"
                        value="pleasant"
                        checked={formData.childhood === "pleasant"}
                        onChange={handleInputChange}
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
                        value="specificFear"
                        checked={formData.childhood === "specificFear"}
                        onChange={handleInputChange}
                        className="form-radio text-blue-600 w-4 h-4"
                      />
                      <span className="ml-3 text-sm text-gray-700">
                        Specific Fear during childhood
                      </span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    {translations.natureLabel}
                  </label>
                  <div className="grid grid-cols-1 gap-2 sm:gap-3">
                    {Object.keys(formData.nature).map((key) => (
                      <label
                        key={key}
                        className="flex items-center p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer transition"
                      >
                        <input
                          type="checkbox"
                          checked={formData.nature[key]}
                          onChange={() => handleCheckboxChange("nature", key)}
                          className="form-checkbox text-blue-600 rounded w-4 h-4"
                        />
                        <span className="ml-3 text-sm text-gray-700 capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {translations.pleasantTime}
                    </label>
                    <input
                      type="text"
                      name="pleasantTime"
                      value={formData.pleasantTime}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm sm:text-base"
                      placeholder={translations.describe}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {translations.strugglingTime}
                    </label>
                    <input
                      type="text"
                      name="strugglingTime"
                      value={formData.strugglingTime}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm sm:text-base"
                      placeholder={translations.describe}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {translations.painfulTime}
                    </label>
                    <input
                      type="text"
                      name="painfulTime"
                      value={formData.painfulTime}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm sm:text-base"
                      placeholder={translations.describe}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {translations.hobbies}
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
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    {translations.stressFactors}
                  </label>
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
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

            {/* Step 2: Early Development */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-3">
                  Early Development
                </h2>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {translations.goodBaby}
                  </label>
                  <input
                    type="text"
                    name="goodBaby"
                    value={formData.goodBaby}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm sm:text-base"
                    placeholder={translations.goodBabyPlaceholder}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {translations.cryingReason}
                  </label>
                  <input
                    type="text"
                    name="cryingReason"
                    value={formData.cryingReason}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm sm:text-base"
                    placeholder={translations.cryingReasonPlaceholder}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    {translations.developmentAges}
                  </label>
                  <div className="grid grid-cols-1 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Teeth
                      </label>
                      <input
                        type="text"
                        value={formData.developmentAges.teeth}
                        onChange={(e) =>
                          handleNestedInputChange(
                            "developmentAges",
                            "teeth",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="Age..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Ability to crawl
                      </label>
                      <input
                        type="text"
                        value={formData.developmentAges.crawl}
                        onChange={(e) =>
                          handleNestedInputChange(
                            "developmentAges",
                            "crawl",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="Age..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Ability to walk
                      </label>
                      <input
                        type="text"
                        value={formData.developmentAges.walk}
                        onChange={(e) =>
                          handleNestedInputChange(
                            "developmentAges",
                            "walk",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="Age..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Ability to talk
                      </label>
                      <input
                        type="text"
                        value={formData.developmentAges.talk}
                        onChange={(e) =>
                          handleNestedInputChange(
                            "developmentAges",
                            "talk",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="Age..."
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    If you are unsure, do you know if these events occurred
                    within the standard age frames?
                  </label>
                  <input
                    type="text"
                    name="standardAgeFrames"
                    value={formData.standardAgeFrames}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm sm:text-base"
                    placeholder={translations.standardAgeFramesPlaceholder}
                  />
                </div>
              </div>
            )}

            {/* Step 3: Illness History */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-3">
                  Illness History
                </h2>
                <p className="text-sm text-gray-600 mb-4 bg-gray-100 p-3 rounded-md border">
                  If affected by any illness, indicate age and severity
                  (severe/mild/long-lasting)
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.keys(formData.illnessHistory).map((illness) => (
                    <div key={illness}>
                      <label className="block text-xs font-medium text-gray-700 mb-1 capitalize">
                        {illness.replace(/([A-Z])/g, " $1").trim()}
                      </label>
                      <input
                        type="text"
                        value={formData.illnessHistory[illness]}
                        onChange={(e) =>
                          handleNestedInputChange(
                            "illnessHistory",
                            illness,
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                        placeholder={translations.illnessPlaceholder}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Recurring Issues & Vaccinations */}
            {currentStep === 4 && (
              <div className="space-y-6 sm:space-y-8">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-3">
                    Recurring Issues
                  </h2>
                  <p className="text-sm text-gray-600 mb-4">
                    Have you suffered from recurring:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {Object.keys(formData.recurring).map((issue) => (
                      <label
                        key={issue}
                        className="flex items-center p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer transition"
                      >
                        <input
                          type="checkbox"
                          checked={formData.recurring[issue]}
                          onChange={() =>
                            handleCheckboxChange("recurring", issue)
                          }
                          className="form-checkbox text-blue-600 rounded w-4 h-4"
                        />
                        <span className="ml-3 text-sm text-gray-700 capitalize">
                          {issue.replace(/([A-Z])/g, " $1").trim()}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-3">
                    Vaccinations
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        {translations.vaccinationReaction}
                      </label>
                      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                        <label className="flex items-center p-2 sm:p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer transition flex-1 text-sm">
                          <input
                            type="radio"
                            name="vaccinationReaction"
                            value="yes"
                            checked={formData.vaccinationReaction === "yes"}
                            onChange={handleInputChange}
                            className="form-radio text-blue-600 w-4 h-4"
                          />
                          <span className="ml-3 text-sm text-gray-700 font-medium">
                            Yes
                          </span>
                        </label>
                        <label className="flex items-center p-2 sm:p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer transition flex-1 text-sm">
                          <input
                            type="radio"
                            name="vaccinationReaction"
                            value="no"
                            checked={formData.vaccinationReaction === "no"}
                            onChange={handleInputChange}
                            className="form-radio text-blue-600 w-4 h-4"
                          />
                          <span className="ml-3 text-sm text-gray-700 font-medium">
                            No
                          </span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        {translations.healthDecline}
                      </label>
                      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                        <label className="flex items-center p-2 sm:p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer transition flex-1 text-sm">
                          <input
                            type="radio"
                            name="healthDecline"
                            value="yes"
                            checked={formData.healthDecline === "yes"}
                            onChange={handleInputChange}
                            className="form-radio text-blue-600 w-4 h-4"
                          />
                          <span className="ml-3 text-sm text-gray-700 font-medium">
                            Yes
                          </span>
                        </label>
                        <label className="flex items-center p-2 sm:p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer transition flex-1 text-sm">
                          <input
                            type="radio"
                            name="healthDecline"
                            value="no"
                            checked={formData.healthDecline === "no"}
                            onChange={handleInputChange}
                            className="form-radio text-blue-600 w-4 h-4"
                          />
                          <span className="ml-3 text-sm text-gray-700 font-medium">
                            No
                          </span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        {translations.allergyInjections}
                      </label>
                      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                        <label className="flex items-center p-2 sm:p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer transition flex-1 text-sm">
                          <input
                            type="radio"
                            name="allergyInjections"
                            value="yes"
                            checked={formData.allergyInjections === "yes"}
                            onChange={handleInputChange}
                            className="form-radio text-blue-600 w-4 h-4"
                          />
                          <span className="ml-3 text-sm text-gray-700 font-medium">
                            Yes
                          </span>
                        </label>
                        <label className="flex items-center p-2 sm:p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer transition flex-1 text-sm">
                          <input
                            type="radio"
                            name="allergyInjections"
                            value="no"
                            checked={formData.allergyInjections === "no"}
                            onChange={handleInputChange}
                            className="form-radio text-blue-600 w-4 h-4"
                          />
                          <span className="ml-3 text-sm text-gray-700 font-medium">
                            No
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Symptoms */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-3">
                  Symptoms & Pain
                </h2>

                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-3">
                    Check all boxes that describe the symptoms/pain:
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                    {Object.keys(formData.symptoms).map((symptom) => (
                      <label
                        key={symptom}
                        className="flex items-center p-2 border border-gray-300 rounded hover:bg-gray-50 cursor-pointer transition text-xs"
                      >
                        <input
                          type="checkbox"
                          checked={formData.symptoms[symptom]}
                          onChange={() =>
                            handleCheckboxChange("symptoms", symptom)
                          }
                          className="form-checkbox text-blue-600 rounded w-4 h-4"
                        />
                        <span className="ml-2 text-gray-700 capitalize">
                          {symptom.replace(/([A-Z])/g, " $1").trim()}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 sm:space-y-4 pt-3 sm:pt-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {translations.symptomsBetter}
                    </label>
                    <p className="text-xs text-gray-500 mb-2">
                      Heat, cold, motion, being still, menstrual cycle, sitting,
                      lying, etc.
                    </p>
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
                      {translations.symptomsWorse}
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
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Is there a specific time of day that your symptoms are
                      worse?
                    </label>
                    <input
                      type="text"
                      name="symptomsTimeOfDay"
                      value={formData.symptomsTimeOfDay}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm sm:text-base"
                      placeholder={translations.symptomsTimePlaceholder}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      {translations.dailyBasis}
                    </label>
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                      <label className="flex items-center p-2 sm:p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer transition flex-1 text-sm">
                        <input
                          type="radio"
                          name="dailyBasis"
                          value="yes"
                          checked={formData.dailyBasis === "yes"}
                          onChange={handleInputChange}
                          className="form-radio text-blue-600 w-4 h-4"
                        />
                        <span className="ml-3 text-sm text-gray-700 font-medium">
                          Yes
                        </span>
                      </label>
                      <label className="flex items-center p-2 sm:p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer transition flex-1 text-sm">
                        <input
                          type="radio"
                          name="dailyBasis"
                          value="no"
                          checked={formData.dailyBasis === "no"}
                          onChange={handleInputChange}
                          className="form-radio text-blue-600 w-4 h-4"
                        />
                        <span className="ml-3 text-sm text-gray-700 font-medium">
                          No
                        </span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {translations.painLocation}
                    </label>
                    <input
                      type="text"
                      name="painLocation"
                      value={formData.painLocation}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm sm:text-base"
                      placeholder={translations.painLocationPlaceholder}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {translations.painExtends}
                    </label>
                    <input
                      type="text"
                      name="painExtends"
                      value={formData.painExtends}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm sm:text-base"
                      placeholder={translations.painExtendsPlaceholder}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 6: Family Health History */}
            {currentStep === 6 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-3">
                  Family Health History
                </h2>
                <p className="text-sm text-gray-600 mb-4 bg-gray-100 p-3 rounded-md border">
                  Indicate which ailments have affected your relatives,
                  including their ages, to the best of your ability.
                </p>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-md">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-r">
                          Relation
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-r">
                          Age if alive
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-r">
                          Age at passing
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                          Ailments
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {Object.keys(formData.familyHealth).map(
                        (relation, index) => (
                          <tr
                            key={relation}
                            className={
                              index % 2 === 0 ? "bg-gray-50" : "bg-white"
                            }
                          >
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 capitalize border-r">
                              {relation.replace(/([A-Z])/g, " $1").trim()}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap border-r">
                              <input
                                type="text"
                                value={formData.familyHealth[relation].ageAlive}
                                onChange={(e) =>
                                  handleFamilyHealthChange(
                                    relation,
                                    "ageAlive",
                                    e.target.value
                                  )
                                }
                                className="w-full px-2 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                                placeholder="Age"
                              />
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap border-r">
                              <input
                                type="text"
                                value={
                                  formData.familyHealth[relation].agePassing
                                }
                                onChange={(e) =>
                                  handleFamilyHealthChange(
                                    relation,
                                    "agePassing",
                                    e.target.value
                                  )
                                }
                                className="w-full px-2 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                                placeholder="Age"
                              />
                            </td>
                            <td className="px-4 py-3">
                              <input
                                type="text"
                                value={formData.familyHealth[relation].ailments}
                                onChange={(e) =>
                                  handleFamilyHealthChange(
                                    relation,
                                    "ailments",
                                    e.target.value
                                  )
                                }
                                className="w-full px-2 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                                placeholder="List ailments..."
                              />
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
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

export default CompleteCaseForm;
