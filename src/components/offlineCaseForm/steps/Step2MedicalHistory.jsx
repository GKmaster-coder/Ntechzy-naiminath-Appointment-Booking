import React from 'react';
import { translations } from '../translations';

const Step2MedicalHistory = ({ formik, getFieldError, language }) => {
  const t = translations[language].step2;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-3">{t.title}</h2>
      
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {t.majorIllnesses.label}
        </label>
        <textarea
          name="majorIllnesses"
          value={formik.values.majorIllnesses}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          rows="3"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 ${
            getFieldError('majorIllnesses') ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder={t.majorIllnesses.placeholder}
        />
        {getFieldError('majorIllnesses') && (
          <div className="text-red-500 text-xs mt-1">{getFieldError('majorIllnesses')}</div>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {t.surgicalHistory.label}
        </label>
        <textarea
          name="surgicalHistory"
          value={formik.values.surgicalHistory}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          rows="2"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder={t.surgicalHistory.placeholder}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {t.currentMedications.label}
        </label>
        <textarea
          name="currentMedications"
          value={formik.values.currentMedications}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          rows="2"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder={t.currentMedications.placeholder}
        />
      </div>
    </div>
  );
};

export default Step2MedicalHistory;