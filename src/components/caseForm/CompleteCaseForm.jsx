import React, { useState } from "react";

const CompleteCaseForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;

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

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
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

          {/* Step Indicators */}
          <div className="flex justify-between items-center">
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

        <div className="bg-white shadow-lg rounded-lg p-6 md:p-8">
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
                    Timeline from birth to present
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Describe your life timeline..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Explain your childhood:
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer transition">
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
                    <label className="flex items-center p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer transition">
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
                    Nature - Reaction during anger (if expressed, explain how):
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Most pleasant time of life
                    </label>
                    <input
                      type="text"
                      name="pleasantTime"
                      value={formData.pleasantTime}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                      placeholder="Describe..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      A struggling time of life
                    </label>
                    <input
                      type="text"
                      name="strugglingTime"
                      value={formData.strugglingTime}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                      placeholder="Describe..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Most painful time of life
                    </label>
                    <input
                      type="text"
                      name="painfulTime"
                      value={formData.painfulTime}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                      placeholder="Describe..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Hobbies
                    </label>
                    <input
                      type="text"
                      name="hobbies"
                      value={formData.hobbies}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                      placeholder="Your hobbies..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Stress factors:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
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
                    Were you a "good" baby?
                  </label>
                  <input
                    type="text"
                    name="goodBaby"
                    value={formData.goodBaby}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Describe your behavior as a baby..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Or did you cry a lot? If so, why?
                  </label>
                  <input
                    type="text"
                    name="cryingReason"
                    value={formData.cryingReason}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Reason for crying..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    At which ages did you develop:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Yes/No/Unsure..."
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
                        placeholder="Age and severity..."
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Recurring Issues & Vaccinations */}
            {currentStep === 4 && (
              <div className="space-y-8">
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
                        Have you had reactions to any vaccinations?
                      </label>
                      <div className="flex space-x-4">
                        <label className="flex items-center p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer transition flex-1">
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
                        <label className="flex items-center p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer transition flex-1">
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
                        Did your health decline after a vaccination?
                      </label>
                      <div className="flex space-x-4">
                        <label className="flex items-center p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer transition flex-1">
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
                        <label className="flex items-center p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer transition flex-1">
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
                        Have you had allergy desensitization injections?
                      </label>
                      <div className="flex space-x-4">
                        <label className="flex items-center p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer transition flex-1">
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
                        <label className="flex items-center p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer transition flex-1">
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

                <div className="space-y-4 pt-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      What makes the pain/symptom better?
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                      placeholder="What helps..."
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
                      placeholder="What worsens..."
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                      placeholder="Time of day..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Do you have pain/symptoms on a daily basis?
                    </label>
                    <div className="flex space-x-4">
                      <label className="flex items-center p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer transition flex-1">
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
                      <label className="flex items-center p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer transition flex-1">
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
                      Where do you feel it? (location)
                    </label>
                    <input
                      type="text"
                      name="painLocation"
                      value={formData.painLocation}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                      placeholder="Pain location..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Does the pain extend to another location? If so, where?
                    </label>
                    <input
                      type="text"
                      name="painExtends"
                      value={formData.painExtends}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                      placeholder="Extension location..."
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
            <div className="flex justify-between mt-8 pt-6 border-t">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-md font-semibold transition ${
                  currentStep === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-gray-600 hover:bg-gray-700 text-white"
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

export default CompleteCaseForm;
