import React from "react";
import { translations } from "../constants/translations";
import {
  ANGER_REACTION_OPTIONS,
  STRESS_FACTORS_OPTIONS,
} from "../constants/formConfig";

const Step1LifeEvents = ({
  formData,
  errors,
  onInputChange,
  onCheckboxChange,
}) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 border-b pb-2 sm:pb-3">
        {translations.significantLifeEvents}
      </h2>

      <div className="bg-blue-50 border-l-4 border-blue-600 p-3 sm:p-4 mb-4 sm:mb-6 rounded text-sm">
        <p className="text-gray-700">
          <strong>{translations.optional}:</strong> Traumatic events can impact
          your health. It's helpful to know the effects and how they left you
          feeling. You can discuss details in person if preferred. / आघातकारी
          घटनाएं आपके स्वास्थ्य को प्रभावित कर सकती हैं। प्रभावों और उन्होंने
          आपको कैसा महसूस कराया, यह जानना मददगार होता है। आप वरीयता के अनुसार
          व्यक्तिगत रूप से विवरण पर चर्चा कर सकते हैं।
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
          onChange={onInputChange}
          rows="4"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 text-sm sm:text-base ${
            errors.lifeTimeline
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-600"
          }`}
          placeholder={translations.timelinePlaceholder}
        />
        {errors.lifeTimeline && (
          <p className="mt-1 text-xs text-red-600">{errors.lifeTimeline}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          {translations.explainChildhood}
        </label>
        <div className="space-y-2">
          <label
            className={`flex items-center p-2 sm:p-3 border rounded-md hover:bg-gray-50 cursor-pointer transition text-sm ${
              errors.childhoodDescription ? "border-red-500" : "border-gray-300"
            }`}
          >
            <input
              type="radio"
              name="childhoodDescription"
              value="pleasant"
              checked={formData.childhoodDescription === "pleasant"}
              onChange={onInputChange}
              className="form-radio text-blue-600 w-4 h-4"
            />
            <span className="ml-2 sm:ml-3 text-gray-700">
              {translations.pleasant}
            </span>
          </label>
          <label
            className={`flex items-center p-2 sm:p-3 border rounded-md hover:bg-gray-50 cursor-pointer transition text-sm ${
              errors.childhoodDescription ? "border-red-500" : "border-gray-300"
            }`}
          >
            <input
              type="radio"
              name="childhoodDescription"
              value="specificFear"
              checked={formData.childhoodDescription === "specificFear"}
              onChange={onInputChange}
              className="form-radio text-blue-600 w-4 h-4"
            />
            <span className="ml-2 sm:ml-3 text-gray-700">
              {translations.specificFear}
            </span>
          </label>
        </div>
        {errors.childhoodDescription && (
          <p className="mt-1 text-xs text-red-600">
            {errors.childhoodDescription}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          {translations.natureLabel}
        </label>
        <div className="grid grid-cols-1 gap-2 sm:gap-3">
          {ANGER_REACTION_OPTIONS.map((key) => (
            <label
              key={key}
              className="flex items-center p-2 sm:p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer transition text-sm"
            >
              <input
                type="checkbox"
                checked={formData.angerReaction?.[key] || false}
                onChange={() => onCheckboxChange("angerReaction", key)}
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
            onChange={onInputChange}
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
            onChange={onInputChange}
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
            onChange={onInputChange}
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
            onChange={onInputChange}
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
          {STRESS_FACTORS_OPTIONS.map((key) => (
            <label
              key={key}
              className="flex items-center p-2 sm:p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer transition text-sm"
            >
              <input
                type="checkbox"
                checked={formData.stressFactors?.[key] || false}
                onChange={() => onCheckboxChange("stressFactors", key)}
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
  );
};

export default Step1LifeEvents;
