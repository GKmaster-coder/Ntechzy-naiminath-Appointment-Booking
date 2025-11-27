import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  submitOnlineAppointment,
  setAppointmentSubmitted,
  getStoredAppointmentData,
} from "../../../store/slices/onlineAppointmentSlice";
import { INITIAL_FORM_DATA, TOTAL_STEPS } from "../constants/formConfig";
import { validateStep, validateAllSteps } from "../utils/formValidation";
import { transformToBackendFormat } from "../utils/dataTransform";

export const useCaseForm = ({
  onFormComplete,
  onFormSubmit,
  isFormComplete: externalIsFormComplete,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isFormComplete, setIsFormComplete] = useState(
    externalIsFormComplete || false
  );
  const [isEditing, setIsEditing] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userId);
  const { isLoading, error, isSubmitted } = useSelector(
    (state) => state.onlineAppointment
  );

  // Memoized validity flags
  const currentStepErrors = useMemo(
    () => validateStep(currentStep, formData),
    [currentStep, formData]
  );
  const isCurrentStepValid = useMemo(
    () => Object.keys(currentStepErrors).length === 0,
    [currentStepErrors]
  );
  const allErrors = useMemo(() => validateAllSteps(formData), [formData]);
  const isAllValid = useMemo(
    () => Object.keys(allErrors).length === 0,
    [allErrors]
  );
  const progressPercentage = (currentStep / TOTAL_STEPS) * 100;

  // Load stored data on mount
  useEffect(() => {
    const loadStoredData = async () => {
      try {
        const storedData = await dispatch(getStoredAppointmentData());
        if (storedData?.payload) {
          setFormData(storedData.payload);
        }
      } catch (error) {
        console.log("No stored appointment data found");
      }
    };
    loadStoredData();
  }, [dispatch]);

  // Sync with Redux state
  useEffect(() => {
    if (isSubmitted) {
      setSubmitted(true);
      setIsFormComplete(true);
      onFormComplete && onFormComplete(true);
    }
  }, [isSubmitted, onFormComplete]);

  // Sync external control
  useEffect(() => {
    if (externalIsFormComplete !== undefined) {
      setIsFormComplete(externalIsFormComplete);
    }
  }, [externalIsFormComplete]);

  // Form handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const handleNestedInputChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handleCheckboxChange = (section, field) => {
    if (section === "symptoms.types") {
      setFormData((prev) => ({
        ...prev,
        symptoms: {
          ...prev.symptoms,
          types: {
            ...prev.symptoms.types,
            [field]: !prev.symptoms.types?.[field],
          },
        },
      }));
      return;
    }
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: !prev[section][field],
      },
    }));
  };

  const handleFamilyHealthChange = (relation, field, value) => {
    setFormData((prev) => ({
      ...prev,
      familyHealth: {
        ...prev.familyHealth,
        [relation]: {
          ...prev.familyHealth[relation],
          [field]: value,
        },
      },
    }));
  };

  // Navigation
  const nextStep = () => {
    const stepErrors = validateStep(currentStep, formData);
    setErrors(stepErrors);
    if (Object.keys(stepErrors).length > 0) return;
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((s) => s - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validateAllSteps(formData);
    setErrors(errs);

    if (Object.keys(errs).length > 0) {
      const firstInvalidStep = [1, 2, 3, 4, 5, 6].find(
        (s) => Object.keys(validateStep(s, formData)).length > 0
      );
      if (firstInvalidStep && firstInvalidStep !== currentStep)
        setCurrentStep(firstInvalidStep);
      return;
    }

    try {
      if (!userId) {
        throw new Error(
          "User ID not found. Please complete user registration first."
        );
      }

      const backendData = transformToBackendFormat(formData);
      const result = await dispatch(submitOnlineAppointment(backendData));

      if (result.success) {
        setIsFormComplete(true);
        setSubmitted(true);
        onFormComplete && onFormComplete(true);
        onFormSubmit && onFormSubmit(backendData);
        alert("Form submitted successfully!");
      } else {
        throw new Error(result.message || "Failed to submit appointment");
      }
    } catch (error) {
      console.error("Failed to submit appointment:", error);
      alert(
        `Failed to submit form. Please try again.\nError: ${error.message}`
      );
    }
  };

  const handleEditForm = () => {
    setIsEditing(true);
    dispatch(setAppointmentSubmitted(false));
    setSubmitted(false);
  };

  const handleSaveEdit = async () => {
    const errs = validateAllSteps(formData);
    setErrors(errs);

    if (Object.keys(errs).length > 0) {
      const firstInvalidStep = [1, 2, 3, 4, 5, 6].find(
        (s) => Object.keys(validateStep(s, formData)).length > 0
      );
      if (firstInvalidStep && firstInvalidStep !== currentStep)
        setCurrentStep(firstInvalidStep);
      return;
    }

    try {
      if (!userId) {
        throw new Error(
          "User ID not found. Please complete user registration first."
        );
      }

      const backendData = transformToBackendFormat(formData);
      const result = await dispatch(
        submitOnlineAppointment(backendData)
      ).unwrap();

      if (result.success) {
        setIsEditing(false);
        setIsFormComplete(true);
        setSubmitted(true);
        onFormComplete && onFormComplete(true);
        alert("Form updated successfully!");
      }
    } catch (error) {
      console.error("Failed to update appointment:", error);
      alert(
        `Failed to submit form. Please try again.\nError: ${error.message}`
      );
    }
  };

  return {
    // State
    currentStep,
    isFormComplete,
    isEditing,
    submitted,
    errors,
    formData,
    isLoading,
    error,

    // Computed values
    isCurrentStepValid,
    isAllValid,
    progressPercentage,

    // Handlers
    handleInputChange,
    handleNestedInputChange,
    handleCheckboxChange,
    handleFamilyHealthChange,
    handleSubmit,
    handleEditForm,
    handleSaveEdit,
    nextStep,
    prevStep,
  };
};
