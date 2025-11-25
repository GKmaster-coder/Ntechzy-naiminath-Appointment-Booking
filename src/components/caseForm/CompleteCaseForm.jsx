import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  submitOnlineAppointment,
  setAppointmentSubmitted,
  getStoredAppointmentData
} from '../../store/slices/onlineAppointmentSlice';
import { setUserId } from '../../store/slices/userSlice';


const CompleteCaseForm = ({ onFormComplete, onFormSubmit, isFormComplete: externalIsFormComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isFormComplete, setIsFormComplete] = useState(externalIsFormComplete || false);
  const [isEditing, setIsEditing] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const totalSteps = 6;

  const dispatch = useDispatch();
  // const { userId } = useSelector((state) => state.user);
  // const Id = sessionStorage.getItem("userId")
  const userId =sessionStorage.getItem("userId")
 
  const { isLoading, error, isSubmitted } = useSelector((state) => state.onlineAppointment);

  // Bilingual text configuration
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

    // Messages
    formCompleted: 'Case Form Completed! / केस फॉर्म पूरा हो गया!',
    formSubmitted: 'Your case form has been successfully submitted. You can now proceed to payment. / आपका केस फॉर्म सफलतापूर्वक सबमिट हो गया है। अब आप भुगतान के लिए आगे बढ़ सकते हैं।',
    confidential: 'Your information is confidential and secure. / आपकी जानकारी गोपनीय और सुरक्षित है।',
    formComplete: '✓ Form is complete. You can proceed to payment. / ✓ फॉर्म पूरा हो गया है। आप भुगतान के लिए आगे बढ़ सकते हैं。',

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
    throbbing: 'Throbbing / धड़कने वाला',

    // API States
    submittingForm: 'Submitting form... / फॉर्म सबमिट किया जा रहा है...',
    submissionSuccess: 'Form submitted successfully! / फॉर्म सफलतापूर्वक सबमिट हो गया!',
    submissionError: 'Failed to submit form. Please try again. / फॉर्म सबमिट करने में विफल। कृपया पुनः प्रयास करें।',
    completePayment: 'Complete Payment / भुगतान पूरा करें',
  };

  // Updated form data structure to match backend schema
  const [formData, setFormData] = useState({
    // Step 1: Life Timeline (matches backend)
    lifeTimeline: '',
    childhoodDescription: '',
    childhoodPleasant: false,
    childhoodSpecificFear: '',
    angerReaction: {},
    pleasantTimeOfLife: '',
    strugglingTimeOfLife: '',
    painfulTimeOfLife: '',
    hobbies: '',
    stressFactors: {},

    // Step 2: Early Development (matches backend)
    earlyDevelopment: {
      goodBaby: false,
      babyBehaviorDescription: '',
      cryingReason: '',
      developmentTeethAge: '',
      developmentCrawlAge: '',
      developmentWalkAge: '',
      developmentTalkAge: '',
      developmentWithinNormalRange: ''
    },

    // Step 3: Illness History (matches backend)
    illnessHistory: {
      chickenPox: '',
      mumps: '',
      germanMeasles: '',
      pneumonia: '',
      measles: '',
      scarletFever: '',
      mononucleosis: '',
      whoopingCough: '',
      typhoid: '',
      accidentInjury: '',
      dengue: '',
      animalBite: '',
      malaria: '',
      surgicalHistory: '',
      otherIllnesses: '',
    },

    // Step 4: Recurring Issues & Vaccinations (matches backend)
    recurringIssues: {
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

    vaccinationReactions: {
      hadReaction: '',
      healthDeclined: '',
      allergyDesensitization: ''
    },

    // Step 5: Symptoms (matches backend)
    symptoms: {
      types: {},
      symptomBetterWith: '',
      symptomWorseWith: '',
      symptomWorseTimeOfDay: '',
      symptomDaily: '',
      symptomLocation: '',
      symptomExtensionLocation: ''
    },

    // Step 6: Family History (matches backend)
    familyHealth: {}
  });

  console.log("testing line no:- 292", formData)

  // Helper function to convert frontend data to backend format
  const transformToBackendFormat = (frontendData) => {
    // Transform anger reaction checkboxes to array
    const angerReactionArray = [];
    if (frontendData.angerReaction?.throwingThings) angerReactionArray.push('throwingThings');
    if (frontendData.angerReaction?.shouting) angerReactionArray.push('shouting');
    if (frontendData.angerReaction?.sittingAlone) angerReactionArray.push('sittingAlone');
    if (frontendData.angerReaction?.avoidingFood) angerReactionArray.push('avoidingFood');
    if (frontendData.angerReaction?.abusingFighting) angerReactionArray.push('abusingFighting');
    if (frontendData.angerReaction?.introverted) angerReactionArray.push('introverted');
    if (frontendData.angerReaction?.likesToBeAlone) angerReactionArray.push('likesToBeAlone');

    // Transform stress factors checkboxes to array
    const stressFactorsArray = [];
    if (frontendData.stressFactors?.family) stressFactorsArray.push('family');
    if (frontendData.stressFactors?.professional) stressFactorsArray.push('professional');
    if (frontendData.stressFactors?.personal) stressFactorsArray.push('personal');
    if (frontendData.stressFactors?.anyOther) stressFactorsArray.push('anyOther');

    // Transform symptoms checkboxes to array
    const symptomsArray = [];
    const symptomTypes = [
      'aching', 'drawing', 'pressureInwards', 'biting', 'dull', 'pressureOutwards',
      'boring', 'electric', 'pulsating', 'bruised', 'gripping', 'shooting',
      'burning', 'jerking', 'sore', 'bursting', 'likeACut', 'stabbing',
      'cramping', 'likePlugStuck', 'stinging', 'crushing', 'likeRock', 'stupefying',
      'cutting', 'likeSplinter', 'tearing', 'digging', 'pinching', 'throbbing'
    ];

    symptomTypes.forEach(symptom => {
      if (frontendData.symptoms?.types?.[symptom]) {
        symptomsArray.push(symptom);
      }
    });

    // Transform recurring issues checkboxes to object (as per backend schema)
    const recurringIssuesObject = frontendData.recurringIssues || {};

    // Transform family history to array
    const familyHistoryArray = [];
    const familyRelations = [
      'mother', 'father', 'siblings', 'maternalGrandmother', 'maternalGrandfather',
      'maternalAuntsUncles', 'paternalGrandmother', 'paternalGrandfather', 'paternalAuntsUncles'
    ];

    familyRelations.forEach(relation => {
      if (frontendData.familyHealth?.[relation]) {
        familyHistoryArray.push({
          relation,
          ageAlive: frontendData.familyHealth[relation]?.ageAlive || '',
          agePassing: frontendData.familyHealth[relation]?.agePassing || '',
          ailments: frontendData.familyHealth[relation]?.ailments || ''
        });
      }
    });

    return {
      // Step 1 data
      lifeTimeline: frontendData.lifeTimeline || '',
      childhoodDescription: frontendData.childhoodDescription || '',
      childhoodPleasant: frontendData.childhoodPleasant || false,
      childhoodSpecificFear: frontendData.childhoodSpecificFear || '',
      angerReaction: angerReactionArray,
      pleasantTimeOfLife: frontendData.pleasantTimeOfLife || '',
      strugglingTimeOfLife: frontendData.strugglingTimeOfLife || '',
      painfulTimeOfLife: frontendData.painfulTimeOfLife || '',
      hobbies: frontendData.hobbies || '',
      stressFactors: stressFactorsArray,

      // Step 2 data
      earlyDevelopment: {
        goodBaby: frontendData.earlyDevelopment?.goodBaby || false,
        babyBehaviorDescription: frontendData.earlyDevelopment?.babyBehaviorDescription || '',
        cryingReason: frontendData.earlyDevelopment?.cryingReason || '',
        developmentTeethAge: frontendData.earlyDevelopment?.developmentTeethAge || '',
        developmentCrawlAge: frontendData.earlyDevelopment?.developmentCrawlAge || '',
        developmentWalkAge: frontendData.earlyDevelopment?.developmentWalkAge || '',
        developmentTalkAge: frontendData.earlyDevelopment?.developmentTalkAge || '',
        developmentWithinNormalRange: frontendData.earlyDevelopment?.developmentWithinNormalRange || ''
      },

      // Step 3 data
      illnessHistory: frontendData.illnessHistory || {},

      // Step 4 data
      recurringIssues: recurringIssuesObject,
      vaccinationReactions: frontendData.vaccinationReactions || {},

      // Step 5 data
      symptoms: {
        types: symptomsArray,
        symptomBetterWith: frontendData.symptoms?.symptomBetterWith || '',
        symptomWorseWith: frontendData.symptoms?.symptomWorseWith || '',
        symptomWorseTimeOfDay: frontendData.symptoms?.symptomWorseTimeOfDay || '',
        symptomDaily: frontendData.symptoms?.symptomDaily || '',
        symptomLocation: frontendData.symptoms?.symptomLocation || '',
        symptomExtensionLocation: frontendData.symptoms?.symptomExtensionLocation || ''
      },

      // Step 6 data
      familyHistory: familyHistoryArray
    };
  };

  // Simple validators
  const isNonEmpty = (v) => typeof v === 'string' && v.trim() !== '';
  const isYesNo = (v) => v === 'yes' || v === 'no';

  // Per-step validation rules
  const validateStep = (step, data = formData) => {
    const e = {};
    if (step === 1) {
      if (!isNonEmpty(data.lifeTimeline)) e.lifeTimeline = 'Required';
      if (!isNonEmpty(data.childhoodDescription)) e.childhoodDescription = 'Required';
    }
    if (step === 2) {
      if (!isNonEmpty(data.earlyDevelopment.babyBehaviorDescription)) e.babyBehaviorDescription = 'Required';
      if (!isNonEmpty(data.earlyDevelopment.developmentWithinNormalRange)) e.developmentWithinNormalRange = 'Required';
    }
    if (step === 3) {
      // Optional by design
    }
    if (step === 4) {
      if (!isYesNo(data.vaccinationReactions.hadReaction)) e.hadReaction = 'Select yes/no';
      if (!isYesNo(data.vaccinationReactions.healthDeclined)) e.healthDeclined = 'Select yes/no';
      if (!isYesNo(data.vaccinationReactions.allergyDesensitization)) e.allergyDesensitization = 'Select yes/no';
    }
    if (step === 5) {
      if (!isNonEmpty(data.symptoms.symptomBetterWith)) e.symptomBetterWith = 'Required';
      if (!isNonEmpty(data.symptoms.symptomWorseWith)) e.symptomWorseWith = 'Required';
      if (!isYesNo(data.symptoms.symptomDaily)) e.symptomDaily = 'Select yes/no';
      if (!isNonEmpty(data.symptoms.symptomLocation)) e.symptomLocation = 'Required';
    }
    if (step === 6) {
      // Optional table
    }
    return e;
  };

  const validateAll = (data = formData) => {
    return [1, 2, 3, 4, 5, 6].reduce((acc, s) => ({ ...acc, ...validateStep(s, data) }), {});
  };

  // Check for stored appointment data on component mount
  useEffect(() => {
    const loadStoredData = async () => {
      try {
        const storedData = await dispatch(getStoredAppointmentData());
        if (storedData?.payload) {
          setFormData(storedData.payload);
        }
      } catch (error) {
        console.log('No stored appointment data found');
      }
    };

    loadStoredData();
  }, [dispatch]);

  // Sync with Redux state
  useEffect(() => {
    if (isSubmitted) {
      setSubmitted(true);
      setIsFormComplete(true);
      onFormComplete && onFormComplete(true);
    }
  }, [isSubmitted, onFormComplete]);

  // Sync external control only
  useEffect(() => {
    if (externalIsFormComplete !== undefined) {
      setIsFormComplete(externalIsFormComplete);
    }
  }, [externalIsFormComplete]);

  // Memoized validity flags
  const currentStepErrors = useMemo(() => validateStep(currentStep, formData), [currentStep, formData]);
  const isCurrentStepValid = useMemo(() => Object.keys(currentStepErrors).length === 0, [currentStepErrors]);
  const allErrors = useMemo(() => validateAll(formData), [formData]);
  const isAllValid = useMemo(() => Object.keys(allErrors).length === 0, [allErrors]);


  const progressPercentage = (currentStep / totalSteps) * 100;

  // Handlers
  const handleInputChange = (e) => {


    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const handleNestedInputChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handleCheckboxChange = (section, field) => {


    if (section === "symptoms.types") {
      setFormData((prev) => ({
        ...prev,
        symptoms: {
          ...prev.symptoms,
          types: {
            ...prev.symptoms.types,
            [field]: !prev.symptoms.types?.[field]
          }
        }
      }));
      return;
    }
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],

        [field]: !prev[section][field],
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
    const stepErrors = validateStep(currentStep);
    setErrors(stepErrors);
    if (Object.keys(stepErrors).length > 0) return;
    if (currentStep < totalSteps) {
      setCurrentStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((s) => s - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Updated handleSubmit with proper API integration
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validateAll(formData);
    setErrors(errs);

    if (Object.keys(errs).length > 0) {
      const firstInvalidStep = [1, 2, 3, 4, 5, 6].find((s) => Object.keys(validateStep(s, formData)).length > 0);
      if (firstInvalidStep && firstInvalidStep !== currentStep) setCurrentStep(firstInvalidStep);
      return;
    }

    try {
      console.log(userId)
      // Check if userId is available
      if (!userId) { 
        
        throw new Error('User ID not found. Please complete user registration first.');
      }

      // Transform data to backend format before submitting
      const backendData = transformToBackendFormat(formData);
      console.log('Submitting appointment data:', backendData);

      // Submit via Redux thunk action
      const result = await dispatch(submitOnlineAppointment(backendData));

      if (result.success) {
        setIsFormComplete(true);
        setSubmitted(true);
        onFormComplete && onFormComplete(true);
        onFormSubmit && onFormSubmit(backendData);

        console.log('Appointment submitted successfully:', result);
        alert(translations.submissionSuccess);
      } else {
        throw new Error(result.message || 'Failed to submit appointment');
      }
    } catch (error) {
      console.error('Failed to submit appointment:', error);
      alert(`${translations.submissionError}\nError: ${error.message}`);
    }
  };

  const handleEditForm = () => {
    setIsEditing(true);
    dispatch(setAppointmentSubmitted(false));
    setSubmitted(false);
  };

  const handleSaveEdit = async () => {
    const errs = validateAll(formData);
    setErrors(errs);

    if (Object.keys(errs).length > 0) {
      const firstInvalidStep = [1, 2, 3, 4, 5, 6].find((s) => Object.keys(validateStep(s, formData)).length > 0);
      if (firstInvalidStep && firstInvalidStep !== currentStep) setCurrentStep(firstInvalidStep);
      return;
    }

    try {
      if (!userId) {
        throw new Error('User ID not found. Please complete user registration first.');
      }

      const backendData = transformToBackendFormat(formData);
      const result = await dispatch(submitOnlineAppointment(backendData)).unwrap();

      if (result.success) {
        setIsEditing(false);
        setIsFormComplete(true);
        setSubmitted(true);
        onFormComplete && onFormComplete(true);
        console.log('Appointment updated successfully:', result);
        alert('Form updated successfully!');
      }
    } catch (error) {
      console.error('Failed to update appointment:', error);
      alert(`${translations.submissionError}\nError: ${error.message}`);
    }
  };

  const steps = [
    { number: 1, title: translations.lifeEvents },
    { number: 2, title: translations.earlyDevelopment },
    { number: 3, title: translations.illnessHistory },
    { number: 4, title: translations.recurringIssues },
    { number: 5, title: translations.symptoms },
    { number: 6, title: translations.familyHistory },
  ];

  // Show completion screen only after a successful submit
  if (submitted && isFormComplete && !isEditing) {
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

            {/* Payment Button */}
            <div className="mb-6">
              <button
                onClick={() => {
                  // Navigate to payment page or open payment modal
                  console.log('Proceed to payment');
                  alert('Redirecting to payment gateway...');
                }}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md transition text-base sm:text-lg mb-4"
              >
                {translations.completePayment}
              </button>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={handleEditForm}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition text-sm sm:text-base"
              >
                {translations.editForm}
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
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 sm:mb-4 space-y-2 sm:space-y-0">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 text-center sm:text-left">
              {isEditing ? translations.editCaseForm : translations.caseForm}
            </h1>
            <span className="text-xs sm:text-sm font-medium text-gray-600 bg-white px-3 py-1 rounded-full border self-center">
              {translations.step} {currentStep} {translations.of} {totalSteps}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4 sm:mb-6">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Step Indicators */}
          <div className="flex justify-between items-center overflow-x-auto pb-2 -mx-2 px-2">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col items-center shrink-0 px-1 sm:px-2">
                <div
                  className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white font-semibold mb-1 sm:mb-2 text-xs sm:text-sm transition-all duration-300 ${step.number === currentStep
                    ? 'bg-blue-600 shadow-md scale-110'
                    : step.number < currentStep
                      ? 'bg-green-500'
                      : 'bg-gray-300'
                    }`}
                >
                  {step.number < currentStep ? '✓' : step.number}
                </div>
                <span
                  className={`text-xs text-center max-w-16 sm:max-w-none ${step.number === currentStep ? 'font-semibold text-blue-600' : 'text-gray-600'
                    }`}
                >
                  {step.title.split(' / ')[0]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6 md:p-8">
          <form onSubmit={handleSubmit}>
            {/* Step 1 - Life Events */}
            {currentStep === 1 && (
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 border-b pb-2 sm:pb-3">
                  {translations.significantLifeEvents}
                </h2>

                <div className="bg-blue-50 border-l-4 border-blue-600 p-3 sm:p-4 mb-4 sm:mb-6 rounded text-sm">
                  <p className="text-gray-700">
                    <strong>{translations.optional}:</strong> Traumatic events can impact your health. It's helpful to know the effects and how they left you feeling. You can discuss details in person if preferred.
                    / आघातकारी घटनाएं आपके स्वास्थ्य को प्रभावित कर सकती हैं। प्रभावों और उन्होंने आपको कैसा महसूस कराया, यह जानना मददगार होता है। आप वरीयता के अनुसार व्यक्तिगत रूप से विवरण पर चर्चा कर सकते हैं।
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {translations.timelineLabel}
                  </label>
                  <p className="text-xs text-gray-500 mb-2">
                    {translations.timelineDescription}
                  </p>
                  <textarea
                    name="lifeTimeline"
                    value={formData.lifeTimeline}
                    onChange={handleInputChange}
                    rows="4"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 text-sm sm:text-base ${errors.lifeTimeline ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-600'
                      }`}
                    placeholder={translations.timelinePlaceholder}
                  />
                  {errors.lifeTimeline && <p className="mt-1 text-xs text-red-600">{errors.lifeTimeline}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    {translations.explainChildhood}
                  </label>
                  <div className="space-y-2">
                    <label className={`flex items-center p-2 sm:p-3 border rounded-md hover:bg-gray-50 cursor-pointer transition text-sm ${errors.childhoodDescription ? 'border-red-500' : 'border-gray-300'
                      }`}>
                      <input
                        type="radio"
                        name="childhoodDescription"
                        value="pleasant"
                        checked={formData.childhoodDescription === 'pleasant'}
                        onChange={handleInputChange}
                        className="form-radio text-blue-600 w-4 h-4"
                      />
                      <span className="ml-2 sm:ml-3 text-gray-700">{translations.pleasant}</span>
                    </label>
                    <label className={`flex items-center p-2 sm:p-3 border rounded-md hover:bg-gray-50 cursor-pointer transition text-sm ${errors.childhoodDescription ? 'border-red-500' : 'border-gray-300'
                      }`}>
                      <input
                        type="radio"
                        name="childhoodDescription"
                        value="specificFear"
                        checked={formData.childhoodDescription === 'specificFear'}
                        onChange={handleInputChange}
                        className="form-radio text-blue-600 w-4 h-4"
                      />
                      <span className="ml-2 sm:ml-3 text-gray-700">{translations.specificFear}</span>
                    </label>
                  </div>
                  {errors.childhoodDescription && <p className="mt-1 text-xs text-red-600">{errors.childhoodDescription}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    {translations.natureLabel}
                  </label>
                  <div className="grid grid-cols-1 gap-2 sm:gap-3">
                    {['throwingThings', 'shouting', 'sittingAlone', 'avoidingFood', 'abusingFighting', 'introverted', 'likesToBeAlone'].map((key) => (
                      <label key={key} className="flex items-center p-2 sm:p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer transition text-sm">
                        <input
                          type="checkbox"
                          checked={formData.angerReaction?.[key] || false}
                          onChange={() => handleCheckboxChange('angerReaction', key)}
                          className="form-checkbox text-blue-600 rounded w-4 h-4"
                        />
                        <span className="ml-2 sm:ml-3 text-gray-700">
                          {translations[key]}
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
                      name="pleasantTimeOfLife"
                      value={formData.pleasantTimeOfLife}
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
                      name="strugglingTimeOfLife"
                      value={formData.strugglingTimeOfLife}
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
                      name="painfulTimeOfLife"
                      value={formData.painfulTimeOfLife}
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
                    {['family', 'professional', 'personal', 'anyOther'].map((key) => (
                      <label key={key} className="flex items-center p-2 sm:p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer transition text-sm">
                        <input
                          type="checkbox"
                          checked={formData.stressFactors?.[key] || false}
                          onChange={() => handleCheckboxChange('stressFactors', key)}
                          className="form-checkbox text-blue-600 rounded w-4 h-4"
                        />
                        <span className="ml-2 sm:ml-3 text-gray-700">
                          {translations[key]}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2 - Early Development */}
            {currentStep === 2 && (
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 border-b pb-2 sm:pb-3">
                  {translations.earlyDevelopment}
                </h2>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {translations.goodBaby}
                  </label>
                  <input
                    type="text"
                    value={formData.earlyDevelopment.babyBehaviorDescription}
                    onChange={(e) => handleNestedInputChange('earlyDevelopment', 'babyBehaviorDescription', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 text-sm sm:text-base ${errors.babyBehaviorDescription ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-600'
                      }`}
                    placeholder={translations.goodBabyPlaceholder}
                  />
                  {errors.babyBehaviorDescription && <p className="mt-1 text-xs text-red-600">{errors.babyBehaviorDescription}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {translations.cryingReason}
                  </label>
                  <input
                    type="text"
                    value={formData.earlyDevelopment.cryingReason}
                    onChange={(e) => handleNestedInputChange('earlyDevelopment', 'cryingReason', e.target.value)}
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
                      <label className="block text-xs font-medium text-gray-600 mb-1">{translations.teeth}</label>
                      <input
                        type="text"
                        value={formData.earlyDevelopment.developmentTeethAge}
                        onChange={(e) => handleNestedInputChange('earlyDevelopment', 'developmentTeethAge', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm sm:text-base"
                        placeholder={translations.age}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">{translations.crawl}</label>
                      <input
                        type="text"
                        value={formData.earlyDevelopment.developmentCrawlAge}
                        onChange={(e) => handleNestedInputChange('earlyDevelopment', 'developmentCrawlAge', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm sm:text-base"
                        placeholder={translations.age}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">{translations.walk}</label>
                      <input
                        type="text"
                        value={formData.earlyDevelopment.developmentWalkAge}
                        onChange={(e) => handleNestedInputChange('earlyDevelopment', 'developmentWalkAge', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm sm:text-base"
                        placeholder={translations.age}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">{translations.talk}</label>
                      <input
                        type="text"
                        value={formData.earlyDevelopment.developmentTalkAge}
                        onChange={(e) => handleNestedInputChange('earlyDevelopment', 'developmentTalkAge', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm sm:text-base"
                        placeholder={translations.age}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {translations.standardAgeFrames}
                  </label>
                  <input
                    type="text"
                    value={formData.earlyDevelopment.developmentWithinNormalRange}
                    onChange={(e) => handleNestedInputChange('earlyDevelopment', 'developmentWithinNormalRange', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 text-sm sm:text-base ${errors.developmentWithinNormalRange ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-600'
                      }`}
                    placeholder={translations.standardAgeFramesPlaceholder}
                  />
                  {errors.developmentWithinNormalRange && <p className="mt-1 text-xs text-red-600">{errors.developmentWithinNormalRange}</p>}
                </div>
              </div>
            )}

            {/* Step 3 - Illness History */}
            {currentStep === 3 && (
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 border-b pb-2 sm:pb-3">
                  {translations.illnessHistory}
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 mb-4 bg-gray-100 p-3 rounded-md border">
                  {translations.illnessNote}
                </p>

                <div className="grid grid-cols-1 gap-3 sm:gap-4">
                  {Object.keys(formData.illnessHistory).map((illness) => (
                    <div key={illness}>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        {translations[illness]}
                      </label>
                      <input
                        type="text"
                        value={formData.illnessHistory[illness]}
                        onChange={(e) => handleNestedInputChange('illnessHistory', illness, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                        placeholder={translations.illnessPlaceholder}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4 - Recurring Issues & Vaccinations */}
            {currentStep === 4 && (
              <div className="space-y-6 sm:space-y-8">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 border-b pb-2 sm:pb-3">
                    {translations.recurringIssues}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-600 mb-4">
                    {translations.recurringIssuesDesc}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    {Object.keys(formData.recurringIssues).map((issue) => (
                      <label key={issue} className="flex items-center p-2 sm:p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer transition text-sm">
                        <input
                          type="checkbox"
                          checked={formData.recurringIssues[issue]}
                          onChange={() => handleCheckboxChange('recurringIssues', issue)}
                          className="form-checkbox text-blue-600 rounded w-4 h-4"
                        />
                        <span className="ml-2 sm:ml-3 text-gray-700">
                          {translations[issue]}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4 sm:pt-6">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 border-b pb-2 sm:pb-3">
                    Vaccinations / टीकाकरण
                  </h2>

                  <div className="space-y-4 sm:space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        {translations.vaccinationReaction}
                      </label>
                      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                        {['yes', 'no'].map((val) => (
                          <label
                            key={val}
                            className={`flex items-center p-2 sm:p-3 border rounded-md hover:bg-gray-50 cursor-pointer transition flex-1 text-sm ${errors.hadReaction ? 'border-red-500' : 'border-gray-300'
                              }`}
                          >
                            <input
                              type="radio"
                              name="hadReaction"
                              value={val}
                              checked={formData.vaccinationReactions.hadReaction === val}
                              onChange={(e) => handleNestedInputChange('vaccinationReactions', 'hadReaction', e.target.value)}
                              className="form-radio text-blue-600 w-4 h-4"
                            />
                            <span className="ml-2 sm:ml-3 text-gray-700 font-medium">
                              {val === 'yes' ? translations.yes : translations.no}
                            </span>
                          </label>
                        ))}
                      </div>
                      {errors.hadReaction && (
                        <p className="mt-1 text-xs text-red-600">{errors.hadReaction}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        {translations.healthDecline}
                      </label>
                      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                        {['yes', 'no'].map((val) => (
                          <label
                            key={val}
                            className={`flex items-center p-2 sm:p-3 border rounded-md hover:bg-gray-50 cursor-pointer transition flex-1 text-sm ${errors.healthDeclined ? 'border-red-500' : 'border-gray-300'
                              }`}
                          >
                            <input
                              type="radio"
                              name="healthDeclined"
                              value={val}
                              checked={formData.vaccinationReactions.healthDeclined === val}
                              onChange={(e) => handleNestedInputChange('vaccinationReactions', 'healthDeclined', e.target.value)}
                              className="form-radio text-blue-600 w-4 h-4"
                            />
                            <span className="ml-2 sm:ml-3 text-gray-700 font-medium">
                              {val === 'yes' ? translations.yes : translations.no}
                            </span>
                          </label>
                        ))}
                      </div>
                      {errors.healthDeclined && <p className="mt-1 text-xs text-red-600">{errors.healthDeclined}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        {translations.allergyInjections}
                      </label>
                      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                        {['yes', 'no'].map((val) => (
                          <label
                            key={val}
                            className={`flex items-center p-2 sm:p-3 border rounded-md hover:bg-gray-50 cursor-pointer transition flex-1 text-sm ${errors.allergyDesensitization ? 'border-red-500' : 'border-gray-300'
                              }`}
                          >
                            <input
                              type="radio"
                              name="allergyDesensitization"
                              value={val}
                              checked={formData.vaccinationReactions.allergyDesensitization === val}
                              onChange={(e) => handleNestedInputChange('vaccinationReactions', 'allergyDesensitization', e.target.value)}
                              className="form-radio text-blue-600 w-4 h-4"
                            />
                            <span className="ml-2 sm:ml-3 text-gray-700 font-medium">
                              {val === 'yes' ? translations.yes : translations.no}
                            </span>
                          </label>
                        ))}
                      </div>
                      {errors.allergyDesensitization && (
                        <p className="mt-1 text-xs text-red-600">{errors.allergyDesensitization}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5 - Symptoms */}
            {currentStep === 5 && (
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 border-b pb-2 sm:pb-3">
                  {translations.symptomsPain}
                </h2>

                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-3">
                    {translations.symptomsDescription}
                  </p>
                  <div className="grid grid-cols-2 gap-1 sm:gap-2 sm:grid-cols-3 lg:grid-cols-4">
                    {[
                      'aching', 'drawing', 'pressureInwards', 'biting', 'dull', 'pressureOutwards',
                      'boring', 'electric', 'pulsating', 'bruised', 'gripping', 'shooting',
                      'burning', 'jerking', 'sore', 'bursting', 'likeACut', 'stabbing',
                      'cramping', 'likePlugStuck', 'stinging', 'crushing', 'likeRock', 'stupefying',
                      'cutting', 'likeSplinter', 'tearing', 'digging', 'pinching', 'throbbing'
                    ].map((symptom) => (
                      <label key={symptom} className="flex items-center p-1 sm:p-2 border border-gray-300 rounded hover:bg-gray-50 cursor-pointer transition text-xs">
                        <input
                          type="checkbox"
                          checked={formData.symptoms.types?.[symptom] || false}
                          onChange={() => handleCheckboxChange('symptoms.types', symptom)}
                          className="form-checkbox text-blue-600 rounded w-3 h-3 sm:w-4 sm:h-4"
                        />
                        <span className="ml-1 sm:ml-2 text-gray-700">
                          {translations[symptom]?.split(' / ')[0] || symptom}
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
                      {translations.symptomsBetterDesc}
                    </p>
                    <input
                      type="text"
                      value={formData.symptoms.symptomBetterWith}
                      onChange={(e) => handleNestedInputChange('symptoms', 'symptomBetterWith', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 text-sm sm:text-base ${errors.symptomBetterWith ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-600'
                        }`}
                      placeholder={translations.symptomsBetterPlaceholder}
                    />
                    {errors.symptomBetterWith && <p className="mt-1 text-xs text-red-600">{errors.symptomBetterWith}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {translations.symptomsWorse}
                    </label>
                    <input
                      type="text"
                      value={formData.symptoms.symptomWorseWith}
                      onChange={(e) => handleNestedInputChange('symptoms', 'symptomWorseWith', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 text-sm sm:text-base ${errors.symptomWorseWith ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-600'
                        }`}
                      placeholder={translations.symptomsWorsePlaceholder}
                    />
                    {errors.symptomWorseWith && <p className="mt-1 text-xs text-red-600">{errors.symptomWorseWith}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {translations.symptomsTimeOfDay}
                    </label>
                    <input
                      type="text"
                      value={formData.symptoms.symptomWorseTimeOfDay}
                      onChange={(e) => handleNestedInputChange('symptoms', 'symptomWorseTimeOfDay', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm sm:text-base"
                      placeholder={translations.symptomsTimePlaceholder}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      {translations.dailyBasis}
                    </label>
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                      {['yes', 'no'].map((val) => (
                        <label
                          key={val}
                          className={`flex items-center p-2 sm:p-3 border rounded-md hover:bg-gray-50 cursor-pointer transition flex-1 text-sm ${errors.symptomDaily ? 'border-red-500' : 'border-gray-300'
                            }`}
                        >
                          <input
                            type="radio"
                            name="symptomDaily"
                            value={val}
                            checked={formData.symptoms.symptomDaily === val}
                            onChange={(e) => handleNestedInputChange('symptoms', 'symptomDaily', e.target.value)}
                            className="form-radio text-blue-600 w-4 h-4"
                          />
                          <span className="ml-2 sm:ml-3 text-gray-700 font-medium">
                            {val === 'yes' ? translations.yes : translations.no}
                          </span>
                        </label>
                      ))}
                    </div>
                    {errors.symptomDaily && <p className="mt-1 text-xs text-red-600">{errors.symptomDaily}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {translations.painLocation}
                    </label>
                    <input
                      type="text"
                      value={formData.symptoms.symptomLocation}
                      onChange={(e) => handleNestedInputChange('symptoms', 'symptomLocation', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 text-sm sm:text-base ${errors.symptomLocation ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-600'
                        }`}
                      placeholder={translations.painLocationPlaceholder}
                    />
                    {errors.symptomLocation && <p className="mt-1 text-xs text-red-600">{errors.symptomLocation}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {translations.painExtends}
                    </label>
                    <input
                      type="text"
                      value={formData.symptoms.symptomExtensionLocation}
                      onChange={(e) => handleNestedInputChange('symptoms', 'symptomExtensionLocation', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm sm:text-base"
                      placeholder={translations.painExtendsPlaceholder}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 6 - Family History */}
            {currentStep === 6 && (
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 border-b pb-2 sm:pb-3">
                  {translations.familyHistory}
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 mb-4 bg-gray-100 p-3 rounded-md border">
                  {translations.familyHealthNote}
                </p>

                <div className="overflow-x-auto -mx-2 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden border border-gray-300 rounded-md">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="px-2 sm:px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-r">
                              {translations.relation}
                            </th>
                            <th className="px-2 sm:px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-r">
                              {translations.ageAlive}
                            </th>
                            <th className="px-2 sm:px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-r">
                              {translations.agePassing}
                            </th>
                            <th className="px-2 sm:px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                              {translations.ailments}
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {['mother', 'father', 'siblings', 'maternalGrandmother', 'maternalGrandfather', 'maternalAuntsUncles', 'paternalGrandmother', 'paternalGrandfather', 'paternalAuntsUncles'].map((relation, index) => (
                            <tr key={relation} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                              <td className="px-2 sm:px-4 py-2 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900 border-r">
                                {translations[relation]?.split(' / ')[0] || relation}
                              </td>
                              <td className="px-2 sm:px-4 py-2 whitespace-nowrap border-r">
                                <input
                                  type="text"
                                  value={formData.familyHealth?.[relation]?.ageAlive || ''}
                                  onChange={(e) => handleFamilyHealthChange(relation, 'ageAlive', e.target.value)}
                                  className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600 text-xs sm:text-sm"
                                  placeholder={translations.agePlaceholder}
                                />
                              </td>
                              <td className="px-2 sm:px-4 py-2 whitespace-nowrap border-r">
                                <input
                                  type="text"
                                  value={formData.familyHealth?.[relation]?.agePassing || ''}
                                  onChange={(e) => handleFamilyHealthChange(relation, 'agePassing', e.target.value)}
                                  className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600 text-xs sm:text-sm"
                                  placeholder={translations.agePlaceholder}
                                />
                              </td>
                              <td className="px-2 sm:px-4 py-2">
                                <input
                                  type="text"
                                  value={formData.familyHealth?.[relation]?.ailments || ''}
                                  onChange={(e) => handleFamilyHealthChange(relation, 'ailments', e.target.value)}
                                  className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600 text-xs sm:text-sm"
                                  placeholder={translations.ailmentsPlaceholder}
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons - Updated with loading state */}
            <div className="flex flex-col-reverse sm:flex-row justify-between mt-6 sm:mt-8 pt-4 sm:pt-6 border-t space-y-3 sm:space-y-0 space-y-reverse">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1 || isLoading}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-md font-semibold transition text-sm sm:text-base ${currentStep === 1 || isLoading
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-600 hover:bg-gray-700 text-white'
                  }`}
              >
                {translations.previous}
              </button>

              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!isCurrentStepValid || isLoading}
                  className={`px-4 sm:px-6 py-2 sm:py-3 rounded-md text-sm sm:text-base font-semibold transition ${isCurrentStepValid && !isLoading
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                >
                  {translations.next}
                </button>
              ) : (
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  {isEditing && (
                    <button
                      type="button"
                      onClick={handleSaveEdit}
                      disabled={isLoading}
                      className={`px-4 sm:px-6 py-2 sm:py-3 font-semibold rounded-md transition text-sm sm:text-base ${isLoading
                        ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                        : 'bg-green-600 hover:bg-green-700 text-white'
                        }`}
                    >
                      {isLoading ? translations.submittingForm : translations.saveChanges}
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={!isAllValid || isLoading}
                    className={`px-4 sm:px-8 py-2 sm:py-3 font-bold rounded-md transition text-sm sm:text-base ${!isAllValid || isLoading
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700 text-white'
                      }`}
                  >
                    {isLoading ? translations.submittingForm : (isEditing ? translations.updateForm : translations.submitForm)}
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Footer Info */}
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

export default CompleteCaseForm;