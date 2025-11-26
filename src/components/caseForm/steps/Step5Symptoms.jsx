import React from 'react';
import { translations } from '../constants/translations';
import { SYMPTOM_TYPES } from '../constants/formConfig';

const Step5Symptoms = ({ formData = {}, errors = {}, onNestedInputChange, onCheckboxChange }) => {
  const symptoms = formData.symptoms || {};
  return (
    <div className="space-y-4 sm:space-y-6">
      <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 border-b pb-2 sm:pb-3">
        {translations.symptomsPain}
      </h2>

      <div>
        <p className="text-sm font-semibold text-gray-700 mb-3">
          {translations.symptomsDescription}
        </p>
        <div className="grid grid-cols-2 gap-1 sm:gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {SYMPTOM_TYPES.map((symptom) => (
            <label key={symptom} className="flex items-center p-1 sm:p-2 border border-gray-300 rounded hover:bg-gray-50 cursor-pointer transition text-xs">
              <input
                type="checkbox"
                checked={symptoms.types?.[symptom] || false}
                onChange={() => onCheckboxChange('symptoms.types', symptom)}
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
            value={symptoms.symptomBetterWith || ''}
            onChange={(e) => onNestedInputChange('symptoms', 'symptomBetterWith', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 text-sm sm:text-base ${
              errors.symptomBetterWith ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-600'
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
            value={symptoms.symptomWorseWith || ''}
            onChange={(e) => onNestedInputChange('symptoms', 'symptomWorseWith', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 text-sm sm:text-base ${
              errors.symptomWorseWith ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-600'
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
            value={symptoms.symptomWorseTimeOfDay || ''}
            onChange={(e) => onNestedInputChange('symptoms', 'symptomWorseTimeOfDay', e.target.value)}
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
                className={`flex items-center p-2 sm:p-3 border rounded-md hover:bg-gray-50 cursor-pointer transition flex-1 text-sm ${
                  errors.symptomDaily ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="symptomDaily"
                  value={val}
                  checked={symptoms.symptomDaily === val}
                  onChange={(e) => onNestedInputChange('symptoms', 'symptomDaily', e.target.value)}
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
            value={symptoms.symptomLocation || ''}
            onChange={(e) => onNestedInputChange('symptoms', 'symptomLocation', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 text-sm sm:text-base ${
              errors.symptomLocation ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-600'
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
            value={symptoms.symptomExtensionLocation || ''}
            onChange={(e) => onNestedInputChange('symptoms', 'symptomExtensionLocation', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm sm:text-base"
            placeholder={translations.painExtendsPlaceholder}
          />
        </div>
      </div>
    </div>
  );
};

export default Step5Symptoms;