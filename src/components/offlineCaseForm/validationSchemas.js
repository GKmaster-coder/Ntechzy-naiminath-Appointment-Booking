import * as Yup from 'yup';

export const validationSchemas = [
  // Step 1: Personal Background
  Yup.object({
    timeline: Yup.string().min(10, 'Please provide at least 10 characters').required('Brief timeline is required'),
    childhood: Yup.string().min(10, 'Please provide at least 10 characters').required('Please describe your childhood'),
    hobbies: Yup.string().optional(),
    stressFactors: Yup.object({
      family: Yup.boolean(),
      professional: Yup.boolean(),
      personal: Yup.boolean(),
      anyOther: Yup.boolean(),
    }),
  }),

  // Step 2: Medical History
  Yup.object({
    majorIllnesses: Yup.string().min(5, 'Please provide at least 5 characters').required('Major illnesses information is required'),
    surgicalHistory: Yup.string().optional(),
    currentMedications: Yup.string().optional(),
  }),

  // Step 3: Current Symptoms
  Yup.object({
    mainSymptoms: Yup.string().min(10, 'Please provide at least 10 characters').required('Main symptoms description is required'),
    symptomLocation: Yup.string().min(3, 'Please provide at least 3 characters').required('Symptom location is required'),
    symptomDuration: Yup.string().min(3, 'Please provide at least 3 characters').required('Symptom duration is required'),
    symptomsBetter: Yup.string().optional(),
    symptomsWorse: Yup.string().optional(),
    dailyBasis: Yup.string().min(3, 'Please provide at least 3 characters').required('Please indicate if symptoms occur daily'),
  }),

  // Step 4: Family Health History
  Yup.object({
    familyHealthSummary: Yup.string().min(10, 'Please provide at least 10 characters').required('Family health history is required'),
  }),
];

// Complete form validation schema
export const completeFormSchema = Yup.object({
  timeline: Yup.string().min(10, 'Please provide at least 10 characters').required('Brief timeline is required'),
  childhood: Yup.string().min(10, 'Please provide at least 10 characters').required('Please describe your childhood'),
  hobbies: Yup.string().optional(),
  stressFactors: Yup.object({
    family: Yup.boolean(),
    professional: Yup.boolean(),
    personal: Yup.boolean(),
    anyOther: Yup.boolean(),
  }),
  majorIllnesses: Yup.string().min(5, 'Please provide at least 5 characters').required('Major illnesses information is required'),
  surgicalHistory: Yup.string().optional(),
  currentMedications: Yup.string().optional(),
  mainSymptoms: Yup.string().min(10, 'Please provide at least 10 characters').required('Main symptoms description is required'),
  symptomLocation: Yup.string().min(3, 'Please provide at least 3 characters').required('Symptom location is required'),
  symptomDuration: Yup.string().min(3, 'Please provide at least 3 characters').required('Symptom duration is required'),
  symptomsBetter: Yup.string().optional(),
  symptomsWorse: Yup.string().optional(),
  dailyBasis: Yup.string().min(3, 'Please provide at least 3 characters').required('Please indicate if symptoms occur daily'),
  familyHealthSummary: Yup.string().min(10, 'Please provide at least 10 characters').required('Family health history is required'),
});