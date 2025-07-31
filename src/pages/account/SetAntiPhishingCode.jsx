import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { ArrowLeft, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAntiPhishingCode } from "../../redux/user/userThunk"; // adjust path if needed
import { showPromise } from "../../utils/toast";

const schema = Yup.object().shape({
  code: Yup.string()
    .required("Anti-Phishing code is required")
    .max(32, "Maximum 32 characters allowed"),
});

export default function SetAntiPhishingCode() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    showPromise(dispatch(setAntiPhishingCode(data.code)), {
      loading: "Setting anti-phishing code...",
      success: "Code set successfully!",
      error: "Failed to set anti-phishing code",
    });
	navigate("/account/security"); // Navigate to success page
  };

  return (
    <div className="max-w-md mx-auto text-white px-4 py-6">
      {/* Go Back */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center text-gray-300 hover:text-white"
      >
        <ArrowLeft className="mr-2" size={18} />
        <span className="text-sm">Back</span>
      </button>

      <h2 className="text-2xl font-bold mb-4">Set Anti-Phishing code</h2>

      <div className="bg-blue-900 text-sm text-blue-200 p-3 rounded-md mb-6">
        *Do not share your Anti-Phishing code with anyone, including
        Cashtradepro staff.
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Input */}
        <div>
          <label className="flex text-sm mb-1 items-center gap-1">
            Anti-Phishing Code
            <HelpCircle size={14} className="text-gray-400" />
          </label>
          <input
            type="text"
            {...register("code")}
            placeholder="Enter Anti-Phishing code"
            className="w-full bg-zinc-900 border border-gray-700 px-4 py-2 rounded-md text-sm"
          />
          {errors.code && (
            <p className="text-red-500 text-sm mt-1">{errors.code.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={!isValid}
          className={`w-full py-2 rounded-md font-semibold ${
            !isValid
              ? "bg-zinc-700 text-gray-400 cursor-not-allowed"
              : "bg-lime-500 hover:bg-lime-600 text-black"
          }`}
        >
          Next
        </button>
      </form>
    </div>
  );
}
