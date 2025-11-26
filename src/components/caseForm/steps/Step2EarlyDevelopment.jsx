import React from 'react';
import { translations } from '../constants/translations';

const Step2EarlyDevelopment = ({ formData = {}, errors = {}, onNestedInputChange }) => {
  const earlyDevelopment = formData.earlyDevelopment || {};
  return (
    <div className="space-y-4 sm:space-y-6">
      <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 border-b pb-2 sm:pb-3">
        {translations.earlyDevelopment}
      </h2>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {translations.goodBaby}
        </label>
        <input
          type="text"
          value={earlyDevelopment.babyBehaviorDescription || ''}
          onChange={(e) => onNestedInputChange('earlyDevelopment', 'babyBehaviorDescription', e.target.value)}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 text-sm sm:text-base ${
            errors.babyBehaviorDescription ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-600'
          }`}
          placeholder={translations.goodBabyPlaceholder}
        />
        {errors.babyBehaviorDescription && <p className="mt-1 text-xs text-red-600">{errors.babyBehaviorDescription}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {translations.cryingReason}
        </label>
        <input
          type="text"
          value={earlyDevelopment.cryingReason || ''}
          onChange={(e) => onNestedInputChange('earlyDevelopment', 'cryingReason', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm sm:text-base"
          placeholder={translations.cryingReasonPlaceholder}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          {translations.developmentAges}
        </label>
        <div className="grid grid-cols-1 gap-3 sm:gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">{translations.teeth}</label>
            <input
              type="text"
              value={earlyDevelopment.developmentTeethAge || ''}
              onChange={(e) => onNestedInputChange('earlyDevelopment', 'developmentTeethAge', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm sm:text-base"
              placeholder={translations.age}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">{translations.crawl}</label>
            <input
              type="text"
              value={earlyDevelopment.developmentCrawlAge || ''}
              onChange={(e) => onNestedInputChange('earlyDevelopment', 'developmentCrawlAge', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm sm:text-base"
              placeholder={translations.age}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">{translations.walk}</label>
            <input
              type="text"
              value={earlyDevelopment.developmentWalkAge || ''}
              onChange={(e) => onNestedInputChange('earlyDevelopment', 'developmentWalkAge', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm sm:text-base"
              placeholder={translations.age}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">{translations.talk}</label>
            <input
              type="text"
              value={earlyDevelopment.developmentTalkAge || ''}
              onChange={(e) => onNestedInputChange('earlyDevelopment', 'developmentTalkAge', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm sm:text-base"
              placeholder={translations.age}
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {translations.standardAgeFrames}
        </label>
        <input
          type="text"
          value={earlyDevelopment.developmentWithinNormalRange || ''}
          onChange={(e) => onNestedInputChange('earlyDevelopment', 'developmentWithinNormalRange', e.target.value)}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 text-sm sm:text-base ${
            errors.developmentWithinNormalRange ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-600'
          }`}
          placeholder={translations.standardAgeFramesPlaceholder}
        />
        {errors.developmentWithinNormalRange && <p className="mt-1 text-xs text-red-600">{errors.developmentWithinNormalRange}</p>}
      </div>
    </div>
  );
};

export default Step2EarlyDevelopment;