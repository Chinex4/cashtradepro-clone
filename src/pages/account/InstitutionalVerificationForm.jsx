import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { useState } from "react";
import { Listbox } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { showPromise } from "../../utils/toast";
import { institutionalVerification } from "../../redux/user/userThunk";
import GoBack from "../../components/ui/GoBack";
import { useNavigate } from "react-router-dom";

const locationOptions = [
  "North America",
  "South America",
  "Europe",
  "Asia",
  "Africa",
  "Oceania",
  "Special Economy Zones",
];

const assetsOptions = [
  "<$1M",
  "1M–5M",
  "5M–10M",
  "10M–25M",
  "25M–50M",
  "50M–100M",
  "100M–500M",
  ">500M",
];

const schema = Yup.object().shape({
  contact: Yup.string().required("Contact is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  institutionName: Yup.string().required("Institution name is required"),
  location: Yup.string().required("Location is required"),
  assets: Yup.string().required("Assets under management is required"),
});

export default function InstitutionalVerificationForm() {
  const dispatch = useDispatch();
  const [touched, setTouched] = useState(false);
  const navigate = useNavigate();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      contact: "",
      email: "",
      institutionName: "",
      location: "",
      assets: "",
    },
  });
  const createdAt = new Date().toLocaleString("en-US", {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });

  const onSubmit = (data) => {
    const payload = {
      ...data,
      createdAt,
    };
    dispatch(institutionalVerification(payload));
    navigate('/account/identity-verification');

  };

  return (
    <div className="max-w-4xl mx-auto text-white px-4 py-6 space-y-6">
      <GoBack />
      <h2 className="text-2xl font-bold">Institutional certification</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Contact */}
        <div>
          <label className="block text-sm mb-1">Contact</label>
          <input
            {...register("contact", { onChange: () => setTouched(true) })}
            className="w-full bg-zinc-900 border border-gray-700 px-4 py-2 rounded-md text-sm"
            placeholder="Enter"
          />
          {errors.contact && (
            <p className="text-red-500 text-sm mt-1">
              {errors.contact.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            {...register("email", { onChange: () => setTouched(true) })}
            className="w-full bg-zinc-900 border border-gray-700 px-4 py-2 rounded-md text-sm"
            placeholder="Enter"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Institution Name */}
        <div>
          <label className="block text-sm mb-1">Institution Name</label>
          <input
            {...register("institutionName", {
              onChange: () => setTouched(true),
            })}
            className="w-full bg-zinc-900 border border-gray-700 px-4 py-2 rounded-md text-sm"
            placeholder="Enter"
          />
          {errors.institutionName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.institutionName.message}
            </p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm mb-1">Main business location</label>
          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <Listbox
                value={field.value}
                onChange={(val) => {
                  field.onChange(val);
                  setTouched(true);
                }}
              >
                <div className="relative">
                  <Listbox.Button className="w-full bg-zinc-900 border border-gray-700 px-4 py-2 rounded-md text-left text-sm">
                    {field.value || "Select"}
                    <ChevronUpDownIcon className="w-4 h-4 absolute right-2 top-2.5 text-gray-400" />
                  </Listbox.Button>
                  <Listbox.Options className="absolute z-10 mt-1 w-full bg-zinc-800 border border-gray-700 rounded-md text-sm">
                    {locationOptions.map((option) => (
                      <Listbox.Option
                        key={option}
                        value={option}
                        className="px-4 py-2 hover:bg-zinc-700 cursor-pointer"
                      >
                        {option}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
            )}
          />
          {errors.location && (
            <p className="text-red-500 text-sm mt-1">
              {errors.location.message}
            </p>
          )}
        </div>

        {/* Assets */}
        <div>
          <label className="block text-sm mb-1">Assets under management</label>
          <Controller
            name="assets"
            control={control}
            render={({ field }) => (
              <Listbox
                value={field.value}
                onChange={(val) => {
                  field.onChange(val);
                  setTouched(true);
                }}
              >
                <div className="relative">
                  <Listbox.Button className="w-full bg-zinc-900 border border-gray-700 px-4 py-2 rounded-md text-left text-sm">
                    {field.value || "Select"}
                    <ChevronUpDownIcon className="w-4 h-4 absolute right-2 top-2.5 text-gray-400" />
                  </Listbox.Button>
                  <Listbox.Options className="absolute z-10 mt-1 w-full bg-zinc-800 border border-gray-700 rounded-md text-sm max-h-60 overflow-y-auto">
                    {assetsOptions.map((option) => (
                      <Listbox.Option
                        key={option}
                        value={option}
                        className="px-4 py-2 hover:bg-zinc-700 cursor-pointer"
                      >
                        {option}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
            )}
          />
          {errors.assets && (
            <p className="text-red-500 text-sm mt-1">{errors.assets.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!isValid || !touched}
          className={`w-full lg:w-auto lg:px-8 py-2 rounded-md font-semibold ${
            !isValid || !touched
              ? "bg-zinc-700 text-gray-400 cursor-not-allowed"
              : "bg-lime-500 text-black hover:bg-lime-600"
          }`}
        >
          Apply for institution verification
        </button>
      </form>
    </div>
  );
}
