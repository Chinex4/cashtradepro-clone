import { useEffect, useId, useRef, useState } from "react";

export default function TVChart({
  symbol = "NASDAQ:AAPL",
  interval = "D",
  height = 420,
  studies = [],
}) {
  const rawId = useId().replace(/[:]/g, "");
  const containerId = `tv_container_${rawId}`;
  const initialized = useRef(false);
  const [ready, setReady] = useState(!!window.TradingView);

  // Load tv.js once on client
  useEffect(() => {
    if (window.TradingView) {
      setReady(true);
      return;
    }
    const s = document.createElement("script");
    s.src = "https://s3.tradingview.com/tv.js";
    s.async = true;
    s.onload = () => setReady(true);
    document.body.appendChild(s);
  }, []);

  useEffect(() => {
    if (!ready || !window.TradingView) return;

    // Do not double-init (StrictMode mounts effects twice in dev)
    if (initialized.current) return;

    // Ensure the element exists & is connected
    const el = document.getElementById(containerId);
    if (!el || !el.isConnected) return;

    initialized.current = true;

    // Defer one tick so the node is fully laid out in the DOM
    const raf = requestAnimationFrame(() => {
      const target = document.getElementById(containerId);
      if (!target || !target.isConnected) {
        initialized.current = false;
        return;
      }

      // eslint-disable-next-line no-new
      new window.TradingView.widget({
        symbol,
        interval,
        container_id: containerId, // use id (safer for tv.js internals)
        autosize: true,
        height,
        timezone: "Etc/UTC",
        theme: "dark",
        style: "1",
        locale: "en",
        toolbar_bg: "rgba(0,0,0,0)",
        enable_publishing: false,
        hide_top_toolbar: false,
        hide_legend: false,
        withdateranges: true,
        allow_symbol_change: false,
        studies,
      });
    });

    return () => {
      cancelAnimationFrame(raf);
      initialized.current = false;
      // don't wipe innerHTML here: tv.js may still be cleaning up internally
      // if you ever need to rebuild on props change, rebuild by changing key on parent
    };
  }, [ready, containerId, symbol, interval, height, studies]);

  // IMPORTANT: render the element with the id tv.js expects
  return (
    <div
      id={containerId}
      className="w-full rounded-lg bg-zinc-900/30"
      style={{ height }}
    />
  );
}
