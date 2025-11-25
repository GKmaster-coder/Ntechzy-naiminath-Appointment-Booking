import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import ServiceInfo from "../components/ServiceInfo";
import { useCreateUserMutation, useUpdateUserMutation, useGetUserQuery } from "../store/api/userApi";
import {
  storeUserIdForFuture,
  getStoredUserId,
  storeUserData,
  getStoredUserData,
  clearStoredUserData,
  setUserId
} from "../store/slices/userSlice";

const BookingDetailsForm = ({ selectedType, onSubmit }) => {
  const [selectedMode, setSelectedMode] = useState(selectedType || "");
  const [serverErrors, setServerErrors] = useState([]);
  const dispatch = useDispatch();

  const { userId, userData } = useSelector((state) => state.user);

  const [createUser, { isLoading: isCreating }] = useCreateUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const { data: fetchedUserData, isLoading: isUserLoading } = useGetUserQuery(userId, {
    skip: !userId,
  });

  const translations = {
    yourBasicDetails: "Your Basic Details / आपका बुनियादी विवरण",
    pleaseFillDetails: "Please fill your details carefully / कृपया अपना विवरण ध्यान से भरें",
    fullName: "Full Name * / पूरा नाम *",
    mobileNumber: "Mobile Number * / मोबाइल नंबर *",
    emailAddress: "Email Address (Optional) / ईमेल पता (वैकल्पिक)",
    consultationMode: "Consultation Mode * / परामर्श का तरीका *",
    enterFullName: "Enter your full name / अपना पूरा नाम दर्ज करें",
    tenDigitNumber: "10-digit number / 10-अंकीय नंबर",
    emailPlaceholder: "example@mail.com / उदाहरण@मेल.कॉम",
    online: "Online / ऑनलाइन",
    offline: "Offline / ऑफलाइन",
    continue: "Continue → / जारी रखें →",
    onlyLettersSpaces: "Only letters and spaces allowed / केवल अक्षर और रिक्त स्थान अनुमत हैं",
    validFullName: "Full name must be between 2 and 100 characters / पूरा नाम 2 से 100 अक्षरों के बीच होना चाहिए",
    nameRequired: "Name is required / नाम आवश्यक है",
    validIndianNumber: "Must be a valid 10-digit Indian number / एक वैध 10-अंकीय भारतीय नंबर होना चाहिए",
    phoneRequired: "Phone number is required / फोन नंबर आवश्यक है",
    invalidEmail: "Please provide a valid email / कृपया एक वैध ईमेल प्रदान करें",
    chooseConsultation: "Please choose Online or Offline consultation / कृपया ऑनलाइन या ऑफलाइन परामर्श चुनें",
    verifyingDetails: "Verifying your details... / आपका विवरण सत्यापित किया जा रहा है...",
    creatingUser: "Creating booking... / बुकिंग बनाई जा रही है...",
    updatingUser: "Updating booking... / बुकिंग अपडेट की जा रही है...",
    loadingUser: "Loading user data... / उपयोगकर्ता डेटा लोड हो रहा है...",
    newAppointment: "New Appointment / नया अपॉइंटमेंट",
    updateAppointment: "Update Appointment / अपॉइंटमेंट अपडेट करें",
  };

  useEffect(() => {
    dispatch(getStoredUserId());
    dispatch(getStoredUserData());
  }, [dispatch]);

  useEffect(() => {
    if (fetchedUserData?.success && fetchedUserData.data?.user) {
      const user = fetchedUserData.data.user;
      formik.setValues({
        name: user.fullName || "",
        phone: user.mobile || "",
        email: user.email || "",
      });
      setSelectedMode(user.mode || "");
      dispatch(storeUserData(user));
    } else if (userData) {
      formik.setValues({
        name: userData.fullName || "",
        phone: userData.mobile || "",
        email: userData.email || "",
      });
      setSelectedMode(userData.mode || "");
    }
  }, [fetchedUserData, userData, dispatch]);

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: ""
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .matches(/^[A-Za-z\s]+$/, translations.onlyLettersSpaces)
        .min(2, translations.validFullName)
        .max(100, translations.validFullName)
        .required(translations.nameRequired),
      phone: Yup.string()
        .matches(/^[6-9]\d{9}$/, translations.validIndianNumber)
        .required(translations.phoneRequired),
      email: Yup.string()
        .email(translations.invalidEmail)
        .notRequired()
        .nullable()
        .transform((value) => value === '' ? null : value),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setServerErrors([]);
        const userPayload = {
          fullName: values.name.trim(),
          mobile: values.phone,
          mode: selectedMode.toLowerCase(),
          isBookingDone: false,
        };
        if (values.email && values.email.trim()) {
          userPayload.email = values.email.trim();
        }

        let result;
        if (userId) {
          result = await updateUser({ id: userId, ...userPayload }).unwrap();
          console.log(result);


        } else {
          result = await createUser(userPayload).unwrap();
          if (result.success && result.data?.user?._id) {
            const newUserId = result.data.user._id;
            sessionStorage.setItem('userId', newUserId);
            // dispatch(setUserId(newUserId))
            dispatch(storeUserIdForFuture(newUserId));
            dispatch(storeUserData(result.data.user));
          }
        }

        if (result.success) {
          dispatch(clearStoredUserData()); // clear to generate new ID on next form
          onSubmit({
            ...values,
            selectedType: selectedMode,
            user: result.data.user,
            userId: result.data.user._id,
          });
        }
      } catch (error) {
        // error handling code as before
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handlePhoneChange = (e) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.length > 10) val = val.slice(0, 10);
    formik.setFieldValue("phone", val);
    if (serverErrors.length > 0) {
      setServerErrors([]);
    }
  };

  const handleInputChange = (e) => {
    formik.handleChange(e);
    if (serverErrors.length > 0) {
      setServerErrors([]);
    }
  };

  const handleModeSelection = (mode) => {
    setSelectedMode(mode);
    if (serverErrors.length > 0) {
      setServerErrors([]);
    }
  };

  const isLoading = isCreating || isUpdating || formik.isSubmitting || isUserLoading;

  return (
    <div className="w-full max-w-6xl mx-auto py-6 px-3 sm:px-6 lg:px-8">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-gray-200 shadow-lg flex flex-col lg:flex-row overflow-hidden">
        <div className="w-full lg:w-[40%] border-b lg:border-b-0 lg:border-r border-gray-200 bg-white">
          <ServiceInfo textData={translations.serviceText} height="md:h-full" />
        </div>

        <div className="w-full lg:flex-1 p-6 sm:p-8 bg-linear-to-br from-white to-gray-50 flex flex-col justify-start">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            {translations.yourBasicDetails}
          </h1>
          <p className="text-gray-500 text-sm mt-1">{translations.pleaseFillDetails}</p>

          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-blue-800">
                {userId ? translations.updateAppointment : translations.newAppointment}
              </span>
              {userId && (
                <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
                  User ID: {userId}
                </span>
              )}
              {isUserLoading && (
                <span className="text-xs text-blue-600">{translations.loadingUser}</span>
              )}
            </div>
          </div>

          {serverErrors.length > 0 && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <h3 className="text-sm font-medium text-red-800 mb-2">Please fix the following errors:</h3>
              <ul className="text-xs text-red-700 list-disc list-inside">
                {serverErrors.map((error, index) => (
                  <li key={index}>{error.msg || error.message}</li>
                ))}
              </ul>
            </div>
          )}

          <form onSubmit={formik.handleSubmit} className="mt-6 space-y-5">
            {/* Full Name */}
            <div>
              <label className="text-sm font-medium text-gray-800">{translations.fullName}</label>
              <input
                name="name"
                value={formik.values.name}
                onChange={handleInputChange}
                onBlur={formik.handleBlur}
                disabled={isLoading}
                className={`mt-1 w-full rounded-lg border px-4 py-3 text-sm focus:ring-2 transition ${formik.touched.name && formik.errors.name ? "border-red-400 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                  } ${isLoading ? "bg-gray-100 cursor-not-allowed" : ""}`}
                placeholder={translations.enterFullName}
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-xs text-red-500 mt-1">{formik.errors.name}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="text-sm font-medium text-gray-800">{translations.mobileNumber}</label>
              <div className={`mt-1 flex items-center rounded-lg border border-gray-300 overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 ${isLoading ? "bg-gray-100" : ""}`}>
                <span className="px-3 sm:px-4 py-3 bg-gray-100 border-r text-gray-700 text-sm font-medium">+91</span>
                <input
                  name="phone"
                  value={formik.values.phone}
                  onChange={handlePhoneChange}
                  onBlur={formik.handleBlur}
                  maxLength="10"
                  disabled={isLoading}
                  className="flex-1 px-3 sm:px-4 py-3 text-sm outline-none bg-transparent"
                  placeholder={translations.tenDigitNumber}
                />
              </div>
              {formik.touched.phone && formik.errors.phone && (
                <p className="text-xs text-red-500 mt-1">{formik.errors.phone}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-800">{translations.emailAddress}</label>
              <input
                name="email"
                type="email"
                value={formik.values.email}
                onChange={handleInputChange}
                onBlur={formik.handleBlur}
                disabled={isLoading}
                className={`mt-1 w-full rounded-lg border px-4 py-3 text-sm focus:ring-2 transition ${formik.touched.email && formik.errors.email ? "border-red-400 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                  } ${isLoading ? "bg-gray-100 cursor-not-allowed" : ""}`}
                placeholder={translations.emailPlaceholder}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-xs text-red-500 mt-1">{formik.errors.email}</p>
              )}
            </div>

            {/* Consultation Mode */}
            <div>
              <p className="text-sm font-medium text-gray-800 mb-2">{translations.consultationMode}</p>
              <div className="flex flex-col sm:flex-row rounded-lg border border-gray-300 overflow-hidden">
                <button
                  type="button"
                  onClick={() => handleModeSelection("Online")}
                  disabled={isLoading}
                  className={`w-full sm:w-1/2 py-3 text-sm font-semibold transition border-b sm:border-b-0 sm:border-r border-gray-300 ${selectedMode === "Online" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"
                    } ${isLoading ? "cursor-not-allowed opacity-50" : ""}`}
                >
                  {translations.online}
                </button>
                <button
                  type="button"
                  onClick={() => handleModeSelection("Offline")}
                  disabled={isLoading}
                  className={`w-full sm:w-1/2 py-3 text-sm font-semibold transition ${selectedMode === "Offline" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"
                    } ${isLoading ? "cursor-not-allowed opacity-50" : ""}`}
                >
                  {translations.offline}
                </button>
              </div>
              {!selectedMode && formik.submitCount > 0 && (
                <p className="text-xs text-red-500 mt-1">{translations.chooseConsultation}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={!selectedMode || isLoading}
              className={`w-full py-3 rounded-lg text-white font-medium transition shadow-md mt-4 ${!selectedMode || isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                }`}
            >
              {isLoading ? (userId ? translations.updatingUser : translations.creatingUser) : translations.continue}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsForm;
