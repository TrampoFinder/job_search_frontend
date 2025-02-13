import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./app.tsx";
import { BrowserRouter } from "react-router-dom";
import { IdentityProvider } from "./contexts/IdentityContext/index.tsx";
import { JobManagementProvider } from "./contexts/JobContext/index.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <IdentityProvider>
        <JobManagementProvider>
          <App />
        </JobManagementProvider>
      </IdentityProvider>
    </BrowserRouter>
  </StrictMode>
);
