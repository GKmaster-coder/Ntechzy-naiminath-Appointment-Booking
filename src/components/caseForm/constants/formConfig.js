export const TOTAL_STEPS = 6;

export const INITIAL_FORM_DATA = {
  lifeTimeline: "",
  childhoodDescription: "",
  childhoodPleasant: false,
  childhoodSpecificFear: "",
  angerReaction: {},
  pleasantTimeOfLife: "",
  strugglingTimeOfLife: "",
  painfulTimeOfLife: "",
  hobbies: "",
  stressFactors: {},

  earlyDevelopment: {
    goodBaby: false,
    babyBehaviorDescription: "",
    cryingReason: "",
    developmentTeethAge: "",
    developmentCrawlAge: "",
    developmentWalkAge: "",
    developmentTalkAge: "",
    developmentWithinNormalRange: "",
  },

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
    hadReaction: "",
    healthDeclined: "",
    allergyDesensitization: "",
  },

  symptoms: {
    types: {},
    symptomBetterWith: "",
    symptomWorseWith: "",
    symptomWorseTimeOfDay: "",
    symptomDaily: "",
    symptomLocation: "",
    symptomExtensionLocation: "",
  },

  familyHealth: {},
};

export const STEP_TITLES = [
  { number: 1, title: "Life Events" },
  { number: 2, title: "Early Development" },
  { number: 3, title: "Illness History" },
  { number: 4, title: "Recurring Issues" },
  { number: 5, title: "Symptoms" },
  { number: 6, title: "Family History" },
];

export const ANGER_REACTIONS = [
  "throwingThings",
  "shouting",
  "sittingAlone",
  "avoidingFood",
  "abusingFighting",
  "introverted",
  "likesToBeAlone",
];

export const ANGER_REACTION_OPTIONS = ANGER_REACTIONS;

export const STRESS_FACTORS = [
  "family",
  "professional",
  "personal",
  "anyOther",
];

export const STRESS_FACTORS_OPTIONS = STRESS_FACTORS;

export const SYMPTOM_TYPES = [
  "aching",
  "drawing",
  "pressureInwards",
  "biting",
  "dull",
  "pressureOutwards",
  "boring",
  "electric",
  "pulsating",
  "bruised",
  "gripping",
  "shooting",
  "burning",
  "jerking",
  "sore",
  "bursting",
  "likeACut",
  "stabbing",
  "cramping",
  "likePlugStuck",
  "stinging",
  "crushing",
  "likeRock",
  "stupefying",
  "cutting",
  "likeSplinter",
  "tearing",
  "digging",
  "pinching",
  "throbbing",
];

export const FAMILY_RELATIONS = [
  "mother",
  "father",
  "siblings",
  "maternalGrandmother",
  "maternalGrandfather",
  "maternalAuntsUncles",
  "paternalGrandmother",
  "paternalGrandfather",
  "paternalAuntsUncles",
];
