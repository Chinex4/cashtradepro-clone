import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useMemo, useState } from "react";
import { Search } from "lucide-react";

/**
 * Headless UI modal picker.
 * Provide a pairs array like:
 * [{ label: "Apple Inc", code: "AAPL", tvSymbol: "NASDAQ:AAPL" }, ...]
 */
export default function PairPicker({ open, onClose, onPick, pairs = [] }) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return pairs;
    return pairs.filter(
      (p) =>
        p.label.toLowerCase().includes(s) ||
        p.code.toLowerCase().includes(s) ||
        p.tvSymbol.toLowerCase().includes(s)
    );
  }, [q, pairs]);

  return (
    <Transition show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-150"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-start justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 translate-y-2"
              enterTo="opacity-100 translate-y-0"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-2"
            >
              <Dialog.Panel className="w-full max-w-2xl rounded-xl border border-zinc-800 bg-[#0F0F0F] p-4 shadow-2xl">
                <Dialog.Title className="mb-3 text-lg font-semibold text-white">
                  Choose Trading Pair
                </Dialog.Title>

                {/* Search */}
                <div className="relative mb-4">
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-900/40 px-10 py-2 text-sm text-zinc-100 placeholder-zinc-500 outline-none focus:border-lime-400"
                    placeholder="Search symbol, name, or exchange…"
                  />
                  <Search
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 opacity-60"
                    size={18}
                  />
                </div>

                {/* List */}
                <div className="max-h-[60vh] overflow-y-auto rounded-lg border border-zinc-800">
                  <table className="min-w-full text-sm">
                    <thead className="bg-zinc-900/40 text-zinc-400">
                      <tr>
                        <th className="px-3 py-2 text-left font-medium">
                          Symbol
                        </th>
                        <th className="px-3 py-2 text-left font-medium">
                          Name
                        </th>
                        <th className="px-3 py-2 text-left font-medium">
                          Exchange
                        </th>
                        <th className="px-3 py-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((p) => (
                        <tr
                          key={p.tvSymbol}
                          className="border-t border-zinc-800"
                        >
                          <td className="px-3 py-2 text-zinc-200">{p.code}</td>
                          <td className="px-3 py-2 text-zinc-400">{p.label}</td>
                          <td className="px-3 py-2 text-zinc-400">
                            {p.tvSymbol.split(":")[0]}
                          </td>
                          <td className="px-3 py-2">
                            <button
                              onClick={() => {
                                onPick?.(p);
                                onClose?.();
                              }}
                              className="rounded-md border border-zinc-700 px-3 py-1.5 text-xs text-zinc-100 hover:border-lime-400 hover:text-white"
                            >
                              Select
                            </button>
                          </td>
                        </tr>
                      ))}

                      {filtered.length === 0 && (
                        <tr>
                          <td
                            className="px-3 py-6 text-center text-zinc-500"
                            colSpan={4}
                          >
                            No matches
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    onClick={onClose}
                    className="rounded-md border border-zinc-700 px-3 py-1.5 text-sm text-zinc-200 hover:bg-zinc-800/60"
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
