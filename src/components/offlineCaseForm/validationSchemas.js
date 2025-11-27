import * as Yup from 'yup';

export const validationSchemas = [
  // Step 1: Personal Background
  Yup.object({
    timeline: Yup.string().required('Brief timeline is required'),
    childhood: Yup.string().required('Please describe your childhood'),
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
    majorIllnesses: Yup.string().required('Major illnesses information is required'),
    surgicalHistory: Yup.string().optional(),
    currentMedications: Yup.string().optional(),
  }),

  // Step 3: Current Symptoms
  Yup.object({
    mainSymptoms: Yup.string().required('Main symptoms description is required'),
    symptomLocation: Yup.string().required('Symptom location is required'),
    symptomDuration: Yup.string().required('Symptom duration is required'),
    symptomsBetter: Yup.string().optional(),
    symptomsWorse: Yup.string().optional(),
    dailyBasis: Yup.string().required('Please indicate if symptoms occur daily'),
  }),

  // Step 4: Family Health History
  Yup.object({
    familyHealthSummary: Yup.string().required('Family health history is required'),
  }),
];