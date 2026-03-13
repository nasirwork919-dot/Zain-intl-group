import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";

if (typeof window !== "undefined") {
  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }

  const forceTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  };

  forceTop();
  window.addEventListener("pageshow", forceTop);
  window.addEventListener("load", forceTop);
}

createRoot(document.getElementById("root")!).render(<App />);
