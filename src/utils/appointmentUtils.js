// Utility functions for appointment data formatting

export const formatOfflineAppointmentData = (userId, appointmentSlot, formData = null) => {
  if (!userId) {
    throw new Error('User ID is required for appointment creation');
  }
  
  // Format date to dd-mm-yyyy
  let formattedDate;
  if (appointmentSlot?.date) {
    const [year, month, day] = appointmentSlot.date.split('-');
    formattedDate = `${day}-${month}-${year}`;
  } else {
    const today = new Date();
    formattedDate = `${today.getDate().toString().padStart(2, '0')}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getFullYear()}`;
  }
  
  const basePayload = {
    userId,
    date: formattedDate,
    time: appointmentSlot?.time || '10:00',
  };

  // If formData is provided and not empty, include it
  if (formData && Object.values(formData).some(value => 
    typeof value === 'string' ? value.trim() !== '' : 
    typeof value === 'object' ? Object.values(value).some(v => v === true) : 
    false
  )) {
    basePayload.formData = {
      timeline: formData.timeline || '',
      childhood: formData.childhood || '',
      hobbies: formData.hobbies || '',
      stressFactors: {
        family: formData.stressFactors?.family || false,
        professional: formData.stressFactors?.professional || false,
        personal: formData.stressFactors?.personal || false,
        anyOther: formData.stressFactors?.anyOther || false,
      },
      majorIllnesses: formData.majorIllnesses || '',
      surgicalHistory: formData.surgicalHistory || '',
      currentMedications: formData.currentMedications || '',
      mainSymptoms: formData.mainSymptoms || '',
      symptomLocation: formData.symptomLocation || '',
      symptomDuration: formData.symptomDuration || '',
      symptomsBetter: formData.symptomsBetter || '',
      symptomsWorse: formData.symptomsWorse || '',
      dailyBasis: formData.dailyBasis || '',
      familyHealthSummary: formData.familyHealthSummary || '',
    };
  } else {
    // Empty form data structure
    basePayload.formData = {};
  }

  return basePayload;
};

export const validateFormData = (formData) => {
  const requiredFields = [
    'timeline',
    'childhood', 
    'majorIllnesses',
    'mainSymptoms',
    'symptomLocation',
    'symptomDuration',
    'dailyBasis',
    'familyHealthSummary'
  ];

  const missingFields = requiredFields.filter(field => 
    !formData[field] || formData[field].trim() === ''
  );

  return {
    isValid: missingFields.length === 0,
    missingFields,
  };
};