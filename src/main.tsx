import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Prevent rare portal unmount race conditions (Radix/Sonner) from blanking the UI.
// This error can surface as an unhandled promise rejection in some browsers.
window.addEventListener("unhandledrejection", (event) => {
  const reason = event.reason;
  const message =
    typeof reason === "string"
      ? reason
      : reason && typeof reason === "object" && "message" in reason
        ? String((reason as any).message)
        : "";

  if (message.includes("Failed to execute 'removeChild' on 'Node'")) {
    event.preventDefault();
  }
});

createRoot(document.getElementById("root")!).render(<App />);
