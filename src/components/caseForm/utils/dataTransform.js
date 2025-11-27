import {
  ANGER_REACTIONS,
  STRESS_FACTORS,
  SYMPTOM_TYPES,
  FAMILY_RELATIONS,
} from "../constants/formConfig";

export const transformToBackendFormat = (frontendData) => {
  // Transform anger reaction checkboxes to array
  const angerReactionArray = ANGER_REACTIONS.filter(
    (key) => frontendData.angerReaction?.[key]
  );

  // Transform stress factors checkboxes to array
  const stressFactorsArray = STRESS_FACTORS.filter(
    (key) => frontendData.stressFactors?.[key]
  );

  // Transform symptoms checkboxes to array
  const symptomsArray = SYMPTOM_TYPES.filter(
    (symptom) => frontendData.symptoms?.types?.[symptom]
  );

  // Transform family history to array
  const familyHistoryArray = FAMILY_RELATIONS.filter(
    (relation) => frontendData.familyHealth?.[relation]
  ).map((relation) => ({
    relation,
    ageAlive: frontendData.familyHealth[relation]?.ageAlive || "",
    agePassing: frontendData.familyHealth[relation]?.agePassing || "",
    ailments: frontendData.familyHealth[relation]?.ailments || "",
  }));

  return {
    lifeTimeline: frontendData.lifeTimeline || "",
    childhoodDescription: frontendData.childhoodDescription || "",
    childhoodPleasant: frontendData.childhoodPleasant || false,
    childhoodSpecificFear: frontendData.childhoodSpecificFear || "",
    angerReaction: angerReactionArray,
    pleasantTimeOfLife: frontendData.pleasantTimeOfLife || "",
    strugglingTimeOfLife: frontendData.strugglingTimeOfLife || "",
    painfulTimeOfLife: frontendData.painfulTimeOfLife || "",
    hobbies: frontendData.hobbies || "",
    stressFactors: stressFactorsArray,

    earlyDevelopment: {
      goodBaby: frontendData.earlyDevelopment?.goodBaby || false,
      babyBehaviorDescription:
        frontendData.earlyDevelopment?.babyBehaviorDescription || "",
      cryingReason: frontendData.earlyDevelopment?.cryingReason || "",
      developmentTeethAge:
        frontendData.earlyDevelopment?.developmentTeethAge || "",
      developmentCrawlAge:
        frontendData.earlyDevelopment?.developmentCrawlAge || "",
      developmentWalkAge:
        frontendData.earlyDevelopment?.developmentWalkAge || "",
      developmentTalkAge:
        frontendData.earlyDevelopment?.developmentTalkAge || "",
      developmentWithinNormalRange:
        frontendData.earlyDevelopment?.developmentWithinNormalRange || "",
    },

    illnessHistory: frontendData.illnessHistory || {},
    recurringIssues: frontendData.recurringIssues || {},
    vaccinationReactions: frontendData.vaccinationReactions || {},

    symptoms: {
      types: symptomsArray,
      symptomBetterWith: frontendData.symptoms?.symptomBetterWith || "",
      symptomWorseWith: frontendData.symptoms?.symptomWorseWith || "",
      symptomWorseTimeOfDay: frontendData.symptoms?.symptomWorseTimeOfDay || "",
      symptomDaily: frontendData.symptoms?.symptomDaily || "",
      symptomLocation: frontendData.symptoms?.symptomLocation || "",
      symptomExtensionLocation:
        frontendData.symptoms?.symptomExtensionLocation || "",
    },

    familyHistory: familyHistoryArray,
  };
};
