import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium group"
    >
      <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition" />
      <span>Back</span>
    </button>
  );
};

export default BackButton;
