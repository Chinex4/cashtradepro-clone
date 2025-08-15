import { useRef, useState } from "react";
import DashboardShell from "../../../layout/DashboardShell";

/* small UI bits */
const Panel = ({ children, className = "" }) => (
  <div
    className={`rounded-xl border border-zinc-800 bg-[#0F0F0F] p-6 sm:p-8 ${className}`}
  >
    {children}
  </div>
);

export default function UploadProfilePic() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const inputRef = useRef(null);

  function onPick(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    // basic guard: images only
    if (!/^image\/(png|jpe?g|webp)$/i.test(f.type)) {
      alert("Please choose a PNG, JPG, or WEBP image.");
      inputRef.current.value = "";
      setFile(null);
      setPreview("");
      return;
    }
    setFile(f);
    setPreview(URL.createObjectURL(f));
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (!file) return alert("Please choose an image first.");

    // TODO: replace with your API call (multipart/form-data)
    // Example:
    // const form = new FormData();
    // form.append("avatar", file);
    // await api.post("/profile/avatar", form);

    alert("Profile image uploaded (stub).");
    // cleanup preview URL
    URL.revokeObjectURL(preview);
    setPreview("");
    setFile(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <DashboardShell>
      <Panel className="max-w-5xl mx-auto">
        <h2 className="mb-6 text-center text-xl font-semibold text-cyan-300">
          Upload Your Desired Profile Picture
        </h2>

        <form onSubmit={onSubmit} className="space-y-6">
          {/* file input */}
          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={onPick}
            className="block w-full rounded-md border border-zinc-700 bg-zinc-900/40 px-4 py-3 text-zinc-100 file:mr-4 file:rounded-md file:border-0 file:bg-zinc-800 file:px-4 file:py-2 file:text-sm file:text-zinc-200 hover:file:bg-zinc-700"
          />

          {/* preview (optional) */}
          {preview && (
            <div className="flex items-center justify-center">
              <img
                src={preview}
                alt="Preview"
                className="h-28 w-28 rounded-full object-cover ring-1 ring-zinc-700"
              />
            </div>
          )}

          {/* submit */}
          <button
            type="submit"
            className="w-full rounded-md border border-lime-400/80 px-4 py-3 text-center text-lg font-semibold text-white hover:bg-lime-400/10"
          >
            Proceed
          </button>
        </form>
      </Panel>
    </DashboardShell>
  );
}
