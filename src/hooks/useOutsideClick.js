import { useEffect } from "react";

export default function useOutsideClick(ref, onClose, enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    function handle(e) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) onClose?.();
    }

    document.addEventListener("mousedown", handle);
    document.addEventListener("touchstart", handle);
    return () => {
      document.removeEventListener("mousedown", handle);
      document.removeEventListener("touchstart", handle);
    };
  }, [ref, onClose, enabled]);
}
