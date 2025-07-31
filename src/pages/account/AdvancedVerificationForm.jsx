import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { submitAdvancedVerification } from "../../redux/user/userThunk";
import { showPromise } from "../../utils/toast";
import GoBack from "../../components/ui/GoBack";
import { useNavigate } from "react-router-dom";

const schema = Yup.object().shape({
  file: Yup.mixed()
    .required("Proof of address is required")
    .test("fileFormat", "Supported formats: PDF, JPG, PNG", (value) => {
      const file = value?.[0]; // ✅ Fix: Access first item in FileList
      if (!file) return false;

      const validMimeTypes = ["application/pdf", "image/jpeg", "image/png"];
      const validExtensions = [".pdf", ".jpg", ".jpeg", ".png"];

      const fileTypeOk = validMimeTypes.includes(file.type);
      const fileName = file.name?.toLowerCase() || "";
      const extOk = validExtensions.some((ext) => fileName.endsWith(ext));

      return fileTypeOk || extOk;
    })
    .test("fileSize", "File size too large (max 5MB)", (value) => {
      const file = value?.[0]; // ✅ Same here
      return file && file.size <= 5 * 1024 * 1024;
    }),
});


export default function AdvancedVerificationForm() {
  const dispatch = useDispatch();
  const [touched, setTouched] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    dispatch(submitAdvancedVerification(data.file[0])); // we want the File object
    navigate("/account/identity-verification"); // Navigate to success page
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 text-white space-y-6">
      <GoBack />
      <h2 className="text-2xl font-bold">Advanced Verification</h2>

      <div className="bg-[#1a1a1a] p-3 text-sm text-gray-400 rounded-md">
        ⚠ Upload a <strong>utility bill or bank statement</strong> containing:
        <ul className="list-disc pl-5 mt-1">
          <li>Your full name</li>
          <li>Your current address</li>
          <li>Date (not older than 3 months)</li>
        </ul>
        Accepted formats: PDF, JPG, PNG. Max size: 5MB.
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
        encType="multipart/form-data"
      >
        <div>
          <label className="block text-sm mb-1">Upload Proof of Address</label>
          <input
            type="file"
            accept="application/pdf,image/jpeg,image/png"
            {...register("file", { onChange: () => setTouched(true) })}
            className="w-full bg-zinc-900 border border-gray-700 px-4 py-2 rounded-md text-sm text-white"
          />
          {errors.file && (
            <p className="text-red-500 text-sm mt-1">{errors.file.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={!isValid || !touched}
          className={`w-full lg:w-auto px-8 py-2 rounded-md font-semibold ${
            !isValid || !touched
              ? "bg-zinc-700 text-gray-400 cursor-not-allowed"
              : "bg-lime-500 text-black hover:bg-lime-600"
          }`}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
