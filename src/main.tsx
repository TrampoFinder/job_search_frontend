import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { IdentityProvider } from "./contexts/IdentityContext/index.tsx";
import { JobManagementProvider } from "./contexts/JobContext/index.tsx";
import { ReportManagementProvider } from "./contexts/ReportContext/index.tsx";
import "@fortawesome/fontawesome-free/css/all.min.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <IdentityProvider>
        <JobManagementProvider>
          <ReportManagementProvider>
            <App />
          </ReportManagementProvider>
        </JobManagementProvider>
      </IdentityProvider>
    </BrowserRouter>
  </StrictMode>
);
