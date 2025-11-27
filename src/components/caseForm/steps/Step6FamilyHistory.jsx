import React from "react";
import { translations } from "../constants/translations";
import { FAMILY_RELATIONS } from "../constants/formConfig";

const Step6FamilyHistory = ({ formData = {}, onFamilyHealthChange }) => {
  const familyHealth = formData.familyHealth || {};
  return (
    <div className="space-y-4 sm:space-y-6">
      <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 border-b pb-2 sm:pb-3">
        {translations.familyHistory}
      </h2>
      <p className="text-xs sm:text-sm text-gray-600 mb-4 bg-gray-100 p-3 rounded-md border">
        {translations.familyHealthNote}
      </p>

      <div className="overflow-x-auto -mx-2 sm:mx-0">
        <div className="min-w-full inline-block align-middle">
          <div className="overflow-hidden border border-gray-300 rounded-md">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-2 sm:px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-r">
                    {translations.relation}
                  </th>
                  <th className="px-2 sm:px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-r">
                    {translations.ageAlive}
                  </th>
                  <th className="px-2 sm:px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-r">
                    {translations.agePassing}
                  </th>
                  <th className="px-2 sm:px-4 py-2 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    {translations.ailments}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {FAMILY_RELATIONS.map((relation, index) => (
                  <tr
                    key={relation}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="px-2 sm:px-4 py-2 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900 border-r">
                      {translations[relation]?.split(" / ")[0] || relation}
                    </td>
                    <td className="px-2 sm:px-4 py-2 whitespace-nowrap border-r">
                      <input
                        type="text"
                        value={familyHealth[relation]?.ageAlive || ""}
                        onChange={(e) =>
                          onFamilyHealthChange(
                            relation,
                            "ageAlive",
                            e.target.value
                          )
                        }
                        className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600 text-xs sm:text-sm"
                        placeholder={translations.agePlaceholder}
                      />
                    </td>
                    <td className="px-2 sm:px-4 py-2 whitespace-nowrap border-r">
                      <input
                        type="text"
                        value={familyHealth[relation]?.agePassing || ""}
                        onChange={(e) =>
                          onFamilyHealthChange(
                            relation,
                            "agePassing",
                            e.target.value
                          )
                        }
                        className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600 text-xs sm:text-sm"
                        placeholder={translations.agePlaceholder}
                      />
                    </td>
                    <td className="px-2 sm:px-4 py-2">
                      <input
                        type="text"
                        value={familyHealth[relation]?.ailments || ""}
                        onChange={(e) =>
                          onFamilyHealthChange(
                            relation,
                            "ailments",
                            e.target.value
                          )
                        }
                        className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600 text-xs sm:text-sm"
                        placeholder={translations.ailmentsPlaceholder}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step6FamilyHistory;
