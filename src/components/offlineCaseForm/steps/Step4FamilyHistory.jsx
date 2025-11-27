import React from 'react';
import { translations } from '../translations';

const Step4FamilyHistory = ({ formik, getFieldError, language }) => {
  const t = translations[language].step4;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-3">{t.title}</h2>
      
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {t.familyHealthSummary.label}
        </label>
        <textarea
          name="familyHealthSummary"
          value={formik.values.familyHealthSummary}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          rows="3"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 ${
            getFieldError('familyHealthSummary') ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder={t.familyHealthSummary.placeholder}
        />
        {getFieldError('familyHealthSummary') && (
          <div className="text-red-500 text-xs mt-1">{getFieldError('familyHealthSummary')}</div>
        )}
      </div>
    </div>
  );
};

export default Step4FamilyHistory;