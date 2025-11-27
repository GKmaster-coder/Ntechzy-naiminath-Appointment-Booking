const isNonEmpty = (v) => typeof v === "string" && v.trim() !== "";
const isYesNo = (v) => v === "yes" || v === "no";

export const validateStep = (step, data) => {
  const errors = {};

  if (step === 1) {
    if (!isNonEmpty(data.lifeTimeline)) errors.lifeTimeline = "Required";
    if (!isNonEmpty(data.childhoodDescription))
      errors.childhoodDescription = "Required";
  }

  if (step === 2) {
    if (!isNonEmpty(data.earlyDevelopment.babyBehaviorDescription))
      errors.babyBehaviorDescription = "Required";
    if (!isNonEmpty(data.earlyDevelopment.developmentWithinNormalRange))
      errors.developmentWithinNormalRange = "Required";
  }

  if (step === 4) {
    if (!isYesNo(data.vaccinationReactions.hadReaction))
      errors.hadReaction = "Select yes/no";
    if (!isYesNo(data.vaccinationReactions.healthDeclined))
      errors.healthDeclined = "Select yes/no";
    if (!isYesNo(data.vaccinationReactions.allergyDesensitization))
      errors.allergyDesensitization = "Select yes/no";
  }

  if (step === 5) {
    if (!isNonEmpty(data.symptoms.symptomBetterWith))
      errors.symptomBetterWith = "Required";
    if (!isNonEmpty(data.symptoms.symptomWorseWith))
      errors.symptomWorseWith = "Required";
    if (!isYesNo(data.symptoms.symptomDaily))
      errors.symptomDaily = "Select yes/no";
    if (!isNonEmpty(data.symptoms.symptomLocation))
      errors.symptomLocation = "Required";
  }

  return errors;
};

export const validateAllSteps = (data) => {
  return [1, 2, 3, 4, 5, 6].reduce(
    (acc, step) => ({ ...acc, ...validateStep(step, data) }),
    {}
  );
};
