// src/pages/MedicineOrderForm.jsx
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const MedicineOrderForm = () => {
  const [step, setStep] = useState(1);
  const [medicineItems, setMedicineItems] = useState([
    { id: 1, name: "", quantity: 1 },
  ]);

  const translations = {
    orderMedicine: "Order Medicine / दवाई का ऑर्डर",
    patientDetails: "Patient & Medicine Details / मरीज और दवाई का विवरण",
    deliveryAddress: "Delivery Address / डिलीवरी का पता",
    pleaseFillDetails:
      "Please fill the details carefully / कृपया विवरण ध्यानपूर्वक भरें",
    patientName: "Patient Name * / मरीज का नाम *",
    mobileNumber: "Mobile Number * / मोबाइल नंबर *",
    emailAddress: "Email Address (Optional) / ईमेल पता (वैकल्पिक)",
    medicineName: "Medicine Name * / दवाई का नाम *",
    quantity: "Quantity / मात्रा",
    addMedicine: "Add Medicine / दवाई जोड़ें",
    remove: "Remove / हटाएं",
    continue: "Continue → / जारी रखें →",
    back: "← Back / वापस जाएं",
    placeOrder: "Place Order / ऑर्डर दें",
    addressLine1: "Address Line 1 * / पता पंक्ति 1 *",
    addressLine2: "Address Line 2 / पता पंक्ति 2",
    state: "State * / राज्य *",
    district: "District * / जिला *",
    pincode: "Pincode * / पिनकोड *",
    enterFullName: "Enter patient's full name / मरीज का पूरा नाम दर्ज करें",
    tenDigitNumber: "10-digit number / 10-अंकीय नंबर",
    emailPlaceholder: "example@mail.com / उदाहरण@मेल.कॉम",
    enterMedicineName: "Enter medicine name / दवाई का नाम दर्ज करें",
    addressPlaceholder: "Enter your address / अपना पता दर्ज करें",
    onlyLettersSpaces:
      "Only letters and spaces allowed / केवल अक्षर और रिक्त स्थान अनुमत हैं",
    validFullName:
      "Please enter a valid full name / कृपया एक वैध पूरा नाम दर्ज करें",
    nameRequired: "Patient name is required / मरीज का नाम आवश्यक है",
    validIndianNumber:
      "Must be a valid 10-digit Indian number / एक वैध 10-अंकीय भारतीय नंबर होना चाहिए",
    phoneRequired: "Phone number is required / फोन नंबर आवश्यक है",
    invalidEmail: "Invalid Email / अमान्य ईमेल",
    requiredField: "This field is required / यह फ़ील्ड आवश्यक है",
  };

  const formik = useFormik({
    initialValues: {
      patientName: "",
      phone: "",
      email: "",
      addressLine1: "",
      addressLine2: "",
      state: "",
      district: "",
      pincode: "",
    },
    validationSchema: Yup.object({
      patientName: Yup.string()
        .matches(/^[A-Za-z ]+$/, translations.onlyLettersSpaces)
        .min(3, translations.validFullName)
        .required(translations.nameRequired),
      phone: Yup.string()
        .matches(/^[6-9]\d{9}$/, translations.validIndianNumber)
        .required(translations.phoneRequired),
      email: Yup.string().email(translations.invalidEmail).notRequired(),
      addressLine1: Yup.string().when("step", {
        is: 2,
        then: (schema) => schema.required(translations.requiredField),
      }),
      state: Yup.string().when("step", {
        is: 2,
        then: (schema) => schema.required(translations.requiredField),
      }),
      district: Yup.string().when("step", {
        is: 2,
        then: (schema) => schema.required(translations.requiredField),
      }),
      pincode: Yup.string().when("step", {
        is: 2,
        then: (schema) =>
          schema
            .matches(
              /^\d{6}$/,
              "Enter a valid 6-digit pincode / मान्य 6-अंकीय पिनकोड दर्ज करें"
            )
            .required(translations.requiredField),
      }),
    }),
    onSubmit: (values) => {
      if (step === 1) {
        const hasEmptyMedicine = medicineItems.some(
          (item) => !item.name.trim()
        );
        if (hasEmptyMedicine) {
          alert("Please fill all medicine names / कृपया सभी दवाई के नाम भरें");
          return;
        }
        setStep(2);
      } else {
        const orderData = { ...values, medicines: medicineItems };
        console.log("Order Submitted:", orderData);
        alert("Order placed successfully! / ऑर्डर सफलतापूर्वक दिया गया!");
      }
    },
  });

  const handlePhoneChange = (e) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.length > 10) val = val.slice(0, 10);
    formik.setFieldValue("phone", val);
  };

  const addMedicineItem = () => {
    setMedicineItems([
      ...medicineItems,
      { id: Date.now(), name: "", quantity: 1 },
    ]);
  };

  const removeMedicineItem = (id) => {
    if (medicineItems.length > 1) {
      setMedicineItems(medicineItems.filter((item) => item.id !== id));
    }
  };

  const updateMedicineName = (id, name) => {
    setMedicineItems(
      medicineItems.map((item) => (item.id === id ? { ...item, name } : item))
    );
  };

  const updateMedicineQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setMedicineItems(
      medicineItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  return (
    <div className="max-w-3xl mx-auto p-6 sm:p-8 bg-white/95 backdrop-blur rounded-2xl shadow-lg border border-gray-200 my-8">
      <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
        {translations.orderMedicine}
      </h1>
      <p className="text-gray-500 text-sm text-center mb-6">
        {translations.pleaseFillDetails}
      </p>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* STEP 1: Patient & Medicine Details */}
        {step === 1 && (
          <>
            {/* Patient Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {translations.patientName}
              </label>
              <input
                name="patientName"
                value={formik.values.patientName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`mt-1 w-full rounded-lg border px-4 py-3 text-sm focus:ring-2 ${
                  formik.touched.patientName && formik.errors.patientName
                    ? "border-red-400 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                placeholder={translations.enterFullName}
              />
              {formik.touched.patientName && formik.errors.patientName && (
                <p className="text-xs text-red-500 mt-1">
                  {formik.errors.patientName}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {translations.mobileNumber}
              </label>
              <div className="flex mt-1 rounded-lg border border-gray-300 overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
                <span className="px-3 py-3 bg-gray-100 text-gray-700 text-sm font-medium">
                  +91
                </span>
                <input
                  name="phone"
                  value={formik.values.phone}
                  onChange={handlePhoneChange}
                  onBlur={formik.handleBlur}
                  className="flex-1 px-4 py-3 text-sm outline-none"
                  placeholder={translations.tenDigitNumber}
                  maxLength="10"
                />
              </div>
              {formik.touched.phone && formik.errors.phone && (
                <p className="text-xs text-red-500 mt-1">
                  {formik.errors.phone}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {translations.emailAddress}
              </label>
              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`mt-1 w-full rounded-lg border px-4 py-3 text-sm focus:ring-2 ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-400 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                placeholder={translations.emailPlaceholder}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-xs text-red-500 mt-1">
                  {formik.errors.email}
                </p>
              )}
            </div>

            {/* Medicine List */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-800">
                  {translations.medicineName}
                </p>
                <button
                  type="button"
                  onClick={addMedicineItem}
                  className="text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  {translations.addMedicine}
                </button>
              </div>

              <div className="space-y-4">
                {medicineItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 border border-gray-200 rounded-lg"
                  >
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) =>
                        updateMedicineName(item.id, e.target.value)
                      }
                      className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                      placeholder={`${translations.enterMedicineName} ${
                        index + 1
                      }`}
                    />
                    <div className="flex items-center gap-2">
                      <label className="text-xs text-gray-600">
                        {translations.quantity}
                      </label>
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          type="button"
                          onClick={() =>
                            updateMedicineQuantity(item.id, item.quantity - 1)
                          }
                          className="px-3 py-1 text-blue-600 hover:bg-blue-50"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="px-3 py-1 bg-gray-50 text-sm">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateMedicineQuantity(item.id, item.quantity + 1)
                          }
                          className="px-3 py-1 text-blue-600 hover:bg-blue-50"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {medicineItems.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeMedicineItem(item.id)}
                        className="text-red-600 hover:text-red-700 text-sm"
                      >
                        {translations.remove}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg text-white font-medium bg-blue-600 hover:bg-blue-700 shadow-md"
            >
              {translations.continue}
            </button>
          </>
        )}

        {/* STEP 2: Delivery Address */}
        {step === 2 && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {translations.addressLine1}
              </label>
              <input
                name="addressLine1"
                value={formik.values.addressLine1}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`mt-1 w-full rounded-lg border px-4 py-3 text-sm focus:ring-2 ${
                  formik.touched.addressLine1 && formik.errors.addressLine1
                    ? "border-red-400 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                placeholder={translations.addressPlaceholder}
              />
              {formik.touched.addressLine1 && formik.errors.addressLine1 && (
                <p className="text-xs text-red-500 mt-1">
                  {formik.errors.addressLine1}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {translations.addressLine2}
              </label>
              <input
                name="addressLine2"
                value={formik.values.addressLine2}
                onChange={formik.handleChange}
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500"
                placeholder={translations.addressPlaceholder}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {translations.state}
                </label>
                <input
                  name="state"
                  value={formik.values.state}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`mt-1 w-full rounded-lg border px-4 py-3 text-sm focus:ring-2 ${
                    formik.touched.state && formik.errors.state
                      ? "border-red-400 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                  placeholder="Enter State / राज्य दर्ज करें"
                />
                {formik.touched.state && formik.errors.state && (
                  <p className="text-xs text-red-500 mt-1">
                    {formik.errors.state}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {translations.district}
                </label>
                <input
                  name="district"
                  value={formik.values.district}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`mt-1 w-full rounded-lg border px-4 py-3 text-sm focus:ring-2 ${
                    formik.touched.district && formik.errors.district
                      ? "border-red-400 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                  placeholder="Enter District / जिला दर्ज करें"
                />
                {formik.touched.district && formik.errors.district && (
                  <p className="text-xs text-red-500 mt-1">
                    {formik.errors.district}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {translations.pincode}
              </label>
              <input
                name="pincode"
                value={formik.values.pincode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`mt-1 w-full rounded-lg border px-4 py-3 text-sm focus:ring-2 ${
                  formik.touched.pincode && formik.errors.pincode
                    ? "border-red-400 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                placeholder="Enter Pincode / पिनकोड दर्ज करें"
              />
              {formik.touched.pincode && formik.errors.pincode && (
                <p className="text-xs text-red-500 mt-1">
                  {formik.errors.pincode}
                </p>
              )}
            </div>

            <div className="flex justify-between gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/2 py-3 rounded-lg text-blue-600 font-medium border border-blue-600 hover:bg-blue-50 transition"
              >
                {translations.back}
              </button>
              <button
                type="submit"
                className="w-1/2 py-3 rounded-lg text-white font-medium bg-blue-600 hover:bg-blue-700 shadow-md"
              >
                {translations.placeOrder}
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default MedicineOrderForm;
