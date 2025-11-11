import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 
      bg-white shadow-sm text-gray-700 hover:bg-gray-50 hover:border-blue-500 
      hover:text-blue-600 transition-all"
    >
      <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
      <span className="text-sm font-medium">Back</span>
    </button>
  );
};

export default BackButton;