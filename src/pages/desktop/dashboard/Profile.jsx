import { useMemo, useState } from "react";
import DashboardShell from "../../../layout/DashboardShell";
import { Eye, EyeOff } from "lucide-react";

/* ---------- tiny UI bits ---------- */
const Panel = ({ children, className = "" }) => (
  <div
    className={`rounded-xl border border-zinc-800 bg-[#0F0F0F] p-4 sm:p-6 ${className}`}
  >
    {children}
  </div>
);
const Label = ({ children }) => (
  <div className="mb-2 text-[12px] font-semibold tracking-wide text-zinc-300">
    {children}
  </div>
);
const Input = (props) => (
  <input
    {...props}
    className={`w-full rounded-md border border-zinc-700 bg-zinc-900/40 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 outline-none focus:border-lime-400 ${
      props.className || ""
    }`}
  />
);
const Field = ({ label, children }) => (
  <div>
    <Label>{label}</Label>
    {children}
  </div>
);

/* ---------- page ---------- */
export default function Profile() {
  const [tab, setTab] = useState("profile");
  // mock user (replace with data from your store/api)
  const user = useMemo(
    () => ({
      firstName: "Amy",
      lastName: "Logan",
      username: "amytrade",
      email: "kikemee...@gmail.com",
      phone: "+17628643962",
      country: "",
      plan: "",
      createdAt: "2025-01-28 18:58:23",
      userId: "ivjkPFPMh",
    }),
    []
  );

  // local state for editable profile
  const [form, setForm] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email,
    phone: user.phone,
    country: "",
    plan: "",
    createdAt: user.createdAt,
    userId: user.userId,
  });

  // change password
  const [pw, setPw] = useState({ current: "", next: "", confirm: "" });
  const [show, setShow] = useState({
    current: false,
    next: false,
    confirm: false,
  });

  const onChange = (k) => (e) =>
    setForm((s) => ({ ...s, [k]: e.target.value }));
  const onPwChange = (k) => (e) =>
    setPw((s) => ({ ...s, [k]: e.target.value }));

  function submitProfile(e) {
    e.preventDefault();
    // TODO: call API
    alert("Profile saved (stub).");
  }
  function submitPassword(e) {
    e.preventDefault();
    if (pw.next !== pw.confirm) return alert("New passwords do not match.");
    // TODO: call API
    alert("Password updated (stub).");
    setPw({ current: "", next: "", confirm: "" });
  }

  return (
    <DashboardShell>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px,1fr]">
        {/* Left: avatar card */}
        <Panel className="flex flex-col items-center gap-4">
          <div className="grid h-28 w-28 place-items-center rounded-full bg-zinc-800 text-3xl text-zinc-400">
            <span className="select-none">👤</span>
          </div>
          <div className="text-base font-bold text-zinc-100">{`${user.firstName} ${user.lastName}`}</div>
        </Panel>

        {/* Right: tabs + content */}
        <Panel className="p-0">
          {/* tabs */}
          <div className="flex items-center gap-8 border-b border-zinc-800 px-4">
            {[
              { key: "profile", label: "Profile" },
              { key: "password", label: "Change Password" },
            ].map((t) => {
              const active = tab === t.key;
              return (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`relative py-4 text-sm font-semibold ${
                    active ? "text-white" : "text-zinc-300 hover:text-zinc-100"
                  }`}
                >
                  {t.label}
                  <span
                    className={`absolute -bottom-px left-0 h-0.5 rounded-full transition-all ${
                      active ? "w-full bg-lime-400" : "w-0 bg-transparent"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* body */}
          <div className="p-4 sm:p-6">
            {tab === "profile" && (
              <form onSubmit={submitProfile} className="space-y-5">
                <div className="grid grid-cols-1 gap-5">
                  <Field label="First Name">
                    <Input
                      value={form.firstName}
                      onChange={onChange("firstName")}
                    />
                  </Field>
                  <Field label="Last Name">
                    <Input
                      value={form.lastName}
                      onChange={onChange("lastName")}
                    />
                  </Field>
                  <Field label="Username">
                    <Input
                      value={form.username}
                      onChange={onChange("username")}
                    />
                  </Field>
                  <Field label="Email">
                    <Input
                      type="email"
                      value={form.email}
                      onChange={onChange("email")}
                    />
                  </Field>
                  <Field label="Phone">
                    <Input value={form.phone} onChange={onChange("phone")} />
                  </Field>
                  <Field label="Country">
                    <Input
                      placeholder="Enter Country..."
                      value={form.country}
                      onChange={onChange("country")}
                    />
                  </Field>
                  <Field label="Plan">
                    <Input
                      placeholder="Enter Plan..."
                      value={form.plan}
                      onChange={onChange("plan")}
                    />
                  </Field>
                  <Field label="Created At">
                    <Input value={form.createdAt} disabled />
                  </Field>
                  <Field label="User ID">
                    <Input value={form.userId} disabled />
                  </Field>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-md border border-lime-400/70 px-4 py-3 text-sm font-semibold text-white hover:bg-lime-400/10"
                >
                  submit
                </button>
              </form>
            )}

            {tab === "password" && (
              <form
                onSubmit={submitPassword}
                className="grid grid-cols-1 gap-6 lg:grid-cols-2"
              >
                {/* left column */}
                <div className="space-y-6">
                  <div>
                    <Label>Current Password</Label>
                    <div className="relative">
                      <Input
                        type={show.current ? "text" : "password"}
                        placeholder="Old Password"
                        value={pw.current}
                        onChange={onPwChange("current")}
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShow((s) => ({ ...s, current: !s.current }))
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
                      >
                        {show.current ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <Label>Confirm New Password</Label>
                    <div className="relative">
                      <Input
                        type={show.confirm ? "text" : "password"}
                        placeholder="Confirm Password"
                        value={pw.confirm}
                        onChange={onPwChange("confirm")}
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShow((s) => ({ ...s, confirm: !s.confirm }))
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
                      >
                        {show.confirm ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* right column */}
                <div className="space-y-6">
                  <div>
                    <Label>Enter New Password</Label>
                    <div className="relative">
                      <Input
                        type={show.next ? "text" : "password"}
                        placeholder="New Password"
                        value={pw.next}
                        onChange={onPwChange("next")}
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShow((s) => ({ ...s, next: !s.next }))
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
                      >
                        {show.next ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div className="pt-1">
                    <button
                      type="submit"
                      className="rounded-md bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-500"
                    >
                      Update Password
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </Panel>
      </div>
    </DashboardShell>
  );
}
