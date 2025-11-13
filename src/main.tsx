import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import QRCodeGenerator from "./pages/QRCodeGenerator";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QRCodeGenerator />
  </StrictMode>
);
