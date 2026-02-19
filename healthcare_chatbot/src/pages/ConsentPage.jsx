import { useContext } from "react";
import { ConsentContext } from "../context/ConsentContext";

export default function ConsentPage() {
  const { acceptConsent } = useContext(ConsentContext);

  return (
    <div className="h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100">
      <div className="bg-white max-w-md w-full p-8 rounded-2xl shadow-xl">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Medical Disclaimer
        </h2>

        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
          This AI assistant provides general medical information and does not
          replace professional diagnosis or treatment by a licensed doctor.
        </p>

        <button
          onClick={acceptConsent}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition"
        >
          I Understand & Continue
        </button>
      </div>
    </div>
  );
}
