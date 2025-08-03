import { useState } from "react";
import { useDispatch } from "react-redux";
import { showPromise } from "../../utils/toast";
import { submitVerificationThunk } from "../../redux/user/userThunk";
import { useNavigate } from "react-router-dom";

export default function UploadIDPage({ formData, onBack }) {
  const [frontFile, setFrontFile] = useState(null);
  const [backFile, setBackFile] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  	const createdAt = new Date().toLocaleString('en-US', {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
  const handleSubmit = () => {
    const finalData = {
      ...formData,
      frontImage: frontFile,
      backImage: backFile,
      createdAt,
    };

    dispatch(submitVerificationThunk(finalData));
	// navigate('/account/identity-verification'); 
	
  };

  return (
    <div className="max-w-6xl mx-auto text-white px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">Basic Verification</h2>
      <div className="bg-[#1a1a1a] p-3 text-sm text-gray-400 rounded-md mb-6">
        ❗Please upload a clear photo ID. Only PNG, JPEG formats supported, max
        5MB.
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="border border-dashed border-gray-600 p-6 text-center rounded-md">
          <p className="mb-2">Upload front side of the ID</p>
          <input
            type="file"
            accept="image/*"
            id="front"
            className="hidden"
            onChange={(e) => setFrontFile(e.target.files[0])}
          />
          <label
            htmlFor="front"
            className="bg-zinc-800 text-sm px-4 py-2 rounded-md inline-block cursor-pointer"
          >
            📤 Upload image
          </label>
        </div>

        <div className="border border-dashed border-gray-600 p-6 text-center rounded-md">
          <p className="mb-2">Upload back side of the ID</p>
          <input
            type="file"
            accept="image/*"
            id="back"
            className="hidden"
            onChange={(e) => setBackFile(e.target.files[0])}
          />
          <label
            htmlFor="back"
            className="bg-zinc-800 text-sm px-4 py-2 rounded-md inline-block cursor-pointer"
          >
            📤 Upload image
          </label>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={onBack}
          className="bg-zinc-700 text-gray-400 py-2 px-6 rounded-md"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!frontFile || !backFile}
          className="bg-lime-500 hover:bg-lime-600 text-black py-2 px-6 rounded-md disabled:bg-zinc-700 disabled:text-gray-400"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
