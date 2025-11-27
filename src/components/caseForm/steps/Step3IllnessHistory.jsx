import React from "react";
import { translations } from "../constants/translations";

const Step3IllnessHistory = ({ formData, onNestedInputChange }) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 border-b pb-2 sm:pb-3">
        {translations.illnessHistory}
      </h2>
      <p className="text-xs sm:text-sm text-gray-600 mb-4 bg-gray-100 p-3 rounded-md border">
        {translations.illnessNote}
      </p>

      <div className="grid grid-cols-1 gap-3 sm:gap-4">
        {Object.keys(formData.illnessHistory).map((illness) => (
          <div key={illness}>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              {translations[illness]}
            </label>
            <input
              type="text"
              value={formData.illnessHistory[illness]}
              onChange={(e) =>
                onNestedInputChange("illnessHistory", illness, e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
              placeholder={translations.illnessPlaceholder}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Step3IllnessHistory;
