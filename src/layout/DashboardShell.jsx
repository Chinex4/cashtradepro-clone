import { useEffect, useRef, useState } from "react";
import Topbar from "../components/dashboard/Topbar";
import Sidebar from "../components/dashboard/Sidebar";
import useOutsideClick from "../hooks/useOutsideClick";

export default function DashboardShell({ children }) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  useOutsideClick(panelRef, () => setOpen(false), open);

  return (
    <div className="min-h-dvh bg-[#0F0F0F] text-zinc-200">
      <Topbar onOpenSidebar={() => setOpen(true)} />

      <div className="mx-auto max-w-full px-3 sm:px-5">
        <div className="relative flex">
          {/* desktop sticky sidebar */}
          <aside className="hidden lg:block lg:sticky lg:top-14 lg:h-[calc(100dvh-56px)] lg:w-64 lg:flex-none border-r border-zinc-800">
            <div className="h-full overflow-y-auto">
              <div className="px-3 py-4">
                <div className="mb-4 px-2 text-xs uppercase tracking-wider text-zinc-400">
                  Menu
                </div>
                <Sidebar />
              </div>
            </div>
          </aside>

          {/* mobile drawer + overlay */}
          {open && (
            <>
              <div
                className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
                onClick={() => setOpen(false)}
              />
              <div
                ref={panelRef}
                className="fixed inset-y-0 left-0 z-50 w-72 max-w-[80%] border-r border-zinc-800 bg-[#0F0F0F] shadow-2xl lg:hidden"
              >
                <div className="px-4 py-4 border-b border-zinc-800">
                  <div className="">
                    <img
                      className="w-24"
                      src="/cashtradepro-logo2.png"
                      alt=""
                    />
                  </div>
                </div>
                <Sidebar onNavigate={() => setOpen(false)} />
              </div>
            </>
          )}

          {/* main */}
          <main className="flex-1 lg:pl-6 w-full">
            <div className="py-4 lg:py-6">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
