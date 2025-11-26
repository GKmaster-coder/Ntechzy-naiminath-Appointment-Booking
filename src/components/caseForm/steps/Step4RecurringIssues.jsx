import React from 'react';
import { translations } from '../constants/translations';

const Step4RecurringIssues = ({ formData = {}, errors = {}, onCheckboxChange, onNestedInputChange }) => {
  const recurringIssues = formData.recurringIssues || {};
  const vaccinationReactions = formData.vaccinationReactions || {};
  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 border-b pb-2 sm:pb-3">
          {translations.recurringIssues}
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mb-4">
          {translations.recurringIssuesDesc}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
          {Object.keys(recurringIssues).map((issue) => (
            <label key={issue} className="flex items-center p-2 sm:p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer transition text-sm">
              <input
                type="checkbox"
                checked={recurringIssues[issue] || false}
                onChange={() => onCheckboxChange('recurringIssues', issue)}
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
                  className={`flex items-center p-2 sm:p-3 border rounded-md hover:bg-gray-50 cursor-pointer transition flex-1 text-sm ${
                    errors.hadReaction ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="hadReaction"
                    value={val}
                    checked={vaccinationReactions.hadReaction === val}
                    onChange={(e) => onNestedInputChange('vaccinationReactions', 'hadReaction', e.target.value)}
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
                  className={`flex items-center p-2 sm:p-3 border rounded-md hover:bg-gray-50 cursor-pointer transition flex-1 text-sm ${
                    errors.healthDeclined ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="healthDeclined"
                    value={val}
                    checked={vaccinationReactions.healthDeclined === val}
                    onChange={(e) => onNestedInputChange('vaccinationReactions', 'healthDeclined', e.target.value)}
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
                  className={`flex items-center p-2 sm:p-3 border rounded-md hover:bg-gray-50 cursor-pointer transition flex-1 text-sm ${
                    errors.allergyDesensitization ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="allergyDesensitization"
                    value={val}
                    checked={vaccinationReactions.allergyDesensitization === val}
                    onChange={(e) => onNestedInputChange('vaccinationReactions', 'allergyDesensitization', e.target.value)}
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
  );
};

export default Step4RecurringIssues;