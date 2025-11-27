import React from 'react';
import { translations } from '../translations';

const Step3Symptoms = ({ formik, getFieldError, language }) => {
  const t = translations[language].step3;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-3">{t.title}</h2>
      
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {t.mainSymptoms.label}
        </label>
        <textarea
          name="mainSymptoms"
          value={formik.values.mainSymptoms}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          rows="3"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 ${
            getFieldError('mainSymptoms') ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder={t.mainSymptoms.placeholder}
        />
        {getFieldError('mainSymptoms') && (
          <div className="text-red-500 text-xs mt-1">{getFieldError('mainSymptoms')}</div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {t.symptomLocation.label}
          </label>
          <input
            type="text"
            name="symptomLocation"
            value={formik.values.symptomLocation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 ${
              getFieldError('symptomLocation') ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder={t.symptomLocation.placeholder}
          />
          {getFieldError('symptomLocation') && (
            <div className="text-red-500 text-xs mt-1">{getFieldError('symptomLocation')}</div>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {t.symptomDuration.label}
          </label>
          <input
            type="text"
            name="symptomDuration"
            value={formik.values.symptomDuration}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 ${
              getFieldError('symptomDuration') ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder={t.symptomDuration.placeholder}
          />
          {getFieldError('symptomDuration') && (
            <div className="text-red-500 text-xs mt-1">{getFieldError('symptomDuration')}</div>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {t.symptomsBetter.label}
        </label>
        <input
          type="text"
          name="symptomsBetter"
          value={formik.values.symptomsBetter}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder={t.symptomsBetter.placeholder}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {t.symptomsWorse.label}
        </label>
        <input
          type="text"
          name="symptomsWorse"
          value={formik.values.symptomsWorse}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder={t.symptomsWorse.placeholder}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          {t.dailyBasis.label}
        </label>
        <div className="space-y-2">
          {Object.entries(t.dailyBasis.options).map(([key, value]) => (
            <label key={key} className="flex items-center p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer transition">
              <input
                type="radio"
                name="dailyBasis"
                value={key}
                checked={formik.values.dailyBasis === key}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="form-radio text-blue-600 w-4 h-4"
              />
              <span className="ml-3 text-sm text-gray-700">{value}</span>
            </label>
          ))}
        </div>
        {getFieldError('dailyBasis') && (
          <div className="text-red-500 text-xs mt-1">{getFieldError('dailyBasis')}</div>
        )}
      </div>
    </div>
  );
};

export default Step3Symptoms;