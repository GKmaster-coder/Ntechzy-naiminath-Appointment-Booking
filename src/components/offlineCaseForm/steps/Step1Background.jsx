import React from 'react';
import { translations } from '../translations';

const Step1Background = ({ formik, getFieldError, language }) => {
  const t = translations[language].step1;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-3">{t.title}</h2>
      
      <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6 rounded">
        <p className="text-sm text-gray-700">
          {t.infoText}
        </p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {t.timeline.label}
        </label>
        <textarea
          name="timeline"
          value={formik.values.timeline}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          rows="3"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent ${
            getFieldError('timeline') ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder={t.timeline.placeholder}
        />
        {getFieldError('timeline') && (
          <div className="text-red-500 text-xs mt-1">{getFieldError('timeline')}</div>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          {t.childhood.label}
        </label>
        <div className="space-y-2">
          {Object.entries(t.childhood.options).map(([key, value]) => (
            <label key={key} className="flex items-center p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer transition">
              <input
                type="radio"
                name="childhood"
                value={key}
                checked={formik.values.childhood === key}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="form-radio text-blue-600 w-4 h-4"
              />
              <span className="ml-3 text-sm text-gray-700">{value}</span>
            </label>
          ))}
        </div>
        {getFieldError('childhood') && (
          <div className="text-red-500 text-xs mt-1">{getFieldError('childhood')}</div>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {t.hobbies.label}
        </label>
        <input
          type="text"
          name="hobbies"
          value={formik.values.hobbies}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder={t.hobbies.placeholder}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          {t.stressFactors.label}
        </label>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(t.stressFactors).map(([key, value]) => {
            if (key === 'label') return null;
            return (
              <label key={key} className="flex items-center p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer transition">
                <input
                  type="checkbox"
                  checked={formik.values.stressFactors[key]}
                  onChange={() => {
                    formik.setFieldValue(`stressFactors.${key}`, !formik.values.stressFactors[key]);
                  }}
                  className="form-checkbox text-blue-600 rounded w-4 h-4"
                />
                <span className="ml-3 text-sm text-gray-700">{value}</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Step1Background;